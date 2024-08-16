/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../types/UserInterface';
import Roles from '../types/Roles';
import { createToken } from './authService';
import UserStatus from '../types/UserStatus';

const UserModel = require('../models/User');
const VerificationModel = require('../models/VerificationUser');
const { sendVerificationEmail } = require('./Mail/mailService');
import mongoose from 'mongoose';

/**
 * @function getAllUsers
 * @description Get all active users
 * @returns {Promise<User[]>} a promise that resolves with an array of users
 * @see {@link UserModel} for more information on User model
 */
export const getAllUsers = async () => {
  return await UserModel.find({ userStatus: UserStatus.Active });
};

/**
 * @function getDisabledUsers
 * @description Get all disabled users
 * @returns {Promise<User[]>} a promise that resolves with an array of users
 * @see {@link UserModel} for more information on User model
 */
export const getDisabledUsers = async () => {
  return await UserModel.find({ userStatus: UserStatus.Disabled });
};

export const getDisabledClients = async () => {
  return await UserModel.find({
    role: Roles.CLIENT,
    userStatus: UserStatus.Disabled,
  });
};

/**
 * @function getAllClients
 * @description Get all users with the role of client
 * @returns {Promise<User[]>} a promise that resolves with an array of clients
 * @see {@link UserModel} for more information on User model
 */
export const getAllClients = async () => {
  return await UserModel.find({
    role: Roles.CLIENT,
    userStatus: UserStatus.Active,
  });
};

/**
 * @function getAllClientsMainInfo
 * @description Get all clients with only the main information
 * @returns {Promise<User[]>} a promise that resolves with an array of clients
 * @see {@link UserModel} for more information on User model
 */
export const getAllClientsMainInfo = async () => {
  return await UserModel.find(
    { role: Roles.CLIENT, userStatus: UserStatus.Active },
    { email: 1, firstName: 1, lastName: 1, photoUrl: 1 },
  );
};

/**
 * @function isUserWithEmailExists
 * @description Checks if a user with the given email exists
 * @param {string} email - the email to check
 * @returns {Promise<boolean>} a promise that resolves with a boolean
 * @see {@link UserModel} for more information on User model
 */
const isUserWithEmailExists = async (email: string) => {
  return await UserModel.exists({ email: email });
};

/**
 * @function isUserWithPhoneExists
 * @description Checks if a user with the given phone number exists
 * @param {string} phoneNumber - the phone number to check
 * @param {ObjectId} userId - the user ID (optional)
 * @returns {Promise<boolean>} a promise that resolves with a boolean
 * @see {@link UserModel} for more information on User model
 */
const isAnotherUsersWithPhoneExists = async (
  phoneNumber: string,
  userId?: mongoose.Types.ObjectId | string,
) => {
  if (!phoneNumber) {
    return false;
  }
  if (userId && typeof userId === 'string') {
    userId = new mongoose.Types.ObjectId(userId as string);
  }

  const query = {
    phoneNumber,
    _id: {
      $ne: userId ? userId : undefined,
    },
  };

  return await UserModel.exists(query);
};

/**
 * @function createUser
 * @description Creates a new user with the given user object. If the user is an admin or a trainer, the user status is set to pending and a verification email is sent to the user. Otherwise, the user status is set to active.
 * @param {User} user - the user object
 * @returns {Promise<User>} a promise that resolves with the created user
 * @throws {Error} - if the user with the given email or phone number already exists
 * @see {@link isUserWithEmailExists} for more information on checking if a user with the given email exists
 * @see {@link isAnotherUsersWithPhoneExists} for more information on checking if a user with the given phone number exists
 */
export const createUser = async (user: User) => {
  const userWithEmailExists = await isUserWithEmailExists(user.email);
  const userWithPhoneExists = await isAnotherUsersWithPhoneExists(
    user.phoneNumber ? user.phoneNumber : '',
  );
  if (userWithEmailExists) {
    throw new Error(`User with email ${user.email} already exists`);
  }
  if (userWithPhoneExists) {
    throw new Error(
      `User with phone number ${user.phoneNumber} already exists`,
    );
  }
  const newUser = { ...user };
  if (newUser.role === 'admin' || newUser.role === 'trainer') {
    newUser.userStatus = UserStatus.Pending;

    const verificationToken = createToken(
      { data: newUser.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      '1h',
    );
    const verificationUser = new VerificationModel({
      tokenIsUsed: false,
      verificationToken,
    });
    await verificationUser.save();
    const newVerificationableUser = await UserModel({
      ...newUser,
      verification: verificationUser._id,
    });
    await newVerificationableUser.save();
    await sendVerificationEmail(
      newUser.firstName,
      newUser.email,
      `${process.env.REACT_APP_URL}/auth?token=${verificationToken}`,
    );
    await verificationUser.save();
    await VerificationModel.create(verificationUser);
    return await UserModel.create(newVerificationableUser);
  }

  return await UserModel.create(newUser);
};

/**
 * @function getUserById
 * @description Get a user by id
 * @param {string} id - the user id
 * @returns {Promise<User>} a promise that resolves with the user
 * @throws {Error} - if no user id is provided
 * @see {@link UserModel} for more information on User model
 */
export const getUserById = async (id: string) => {
  if (!id) {
    throw new Error('No user id provided');
  }

  return await UserModel.findOne({ _id: id })
    .populate('trainerIds')
    .populate('userIds');
};

/**
 * @function getUserByEmail
 * @description Get a user by email
 * @param {string} email - the user email
 * @returns {Promise<User>} a promise that resolves with the user
 * @throws {Error} - if no user email is provided
 * @see {@link UserModel} for more information on User model
 */
export const updateUser = async (id: string, user: User) => {
  const userWithPhoneExists = await isAnotherUsersWithPhoneExists(
    user.phoneNumber ? user.phoneNumber : '',
    id,
  );
  if (userWithPhoneExists) {
    throw new Error(
      `User with phone number ${user.phoneNumber} already exists`,
    );
  }
  await UserModel.findByIdAndUpdate(id, user);

  return await getUserById(id);
};

/**
 * @function deleteUser
 * @description Delete a user by id
 * @param {string} id - the user id
 * @returns {Promise<void>} a promise that resolves with no value
 * @see {@link UserModel} for more information on User model
 */
export const deleteUser = async (id: string) => {
  await UserModel.findByIdAndDelete(id);
};

/**
 * @function disableUser
 * @description Disable a user by id
 * @param {string} id - the user id
 * @returns {Promise<User>} a promise that resolves with the disabled user
 * @see {@link UserModel} for more information on User model
 */
export const disableUser = async (id: string) => {
  const disabledUser = await UserModel.findByIdAndUpdate(
    id,
    { userStatus: UserStatus.Disabled },
    { new: true },
  );

  return disabledUser;
};

export const activateUser = async (id: string) => {
  const activatedUser = await UserModel.findByIdAndUpdate(
    id,
    { userStatus: UserStatus.Active },
    { new: true },
  );

  return activatedUser;
};

/**
 * @function createUserWithRole
 * @description Creates a new user with the given user object and role. If the user is an admin or a trainer, the user status is set to pending and a verification email is sent to the user. Otherwise, the user status is set to active.
 * @param {any} reqBody - the user object
 * @param {string} userRole - the user role
 * @returns {Promise<User>} a promise that resolves with the user
 * @throws {Error} - if no user email is provided
 * @see {@link UserStatus} for more information on UserStatus
 * @see {@link createUser} for more information on creating a new user
 */
export const createUserWithRole = async (reqBody: any, userRole: string) => {
  const {
    email,
    firstName,
    lastName,
    refreshToken,
    photoUrl,
    phoneNumber,
    trainerIds,
    userIds,
  } = reqBody;

  const user = {
    email,
    firstName,
    lastName,
    role: userRole,
    refreshToken,
    photoUrl,
    phoneNumber,
    trainerIds,
    userIds,
    userStatus: UserStatus.Active,
  };

  return await createUser(user);
};

/**
 * @function deleteUserWithRole
 * @description Deletes a user with the given user object and role
 * @param {any} reqBody - the user object
 * @param {string} userRole - the user role
 * @returns {Promise<void>} a promise that resolves with no value
 * @throws {Error} - if the user is not found or the user role is forbidden
 * @see {@link getUserById} for more information on getting a user by id
 * @see {@link deleteUser} for more information on deleting a user
 */
export const deleteUserWithRole = async (reqBody: any, userRole: string) => {
  const user = await getUserById(reqBody.userToDeleteId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== userRole) {
    throw new Error('Forbidden');
  }

  return await deleteUser(user.id);
};

/**
 * @function disableUserWithRole
 * @description Disables a user with the given user object and role
 * @param {any} reqBody - the user object
 * @param {string} userRole - the user role
 * @returns {Promise<User>} a promise that resolves with the disabled user
 * @throws {Error} - if the user is not found or the user role is forbidden
 * @see {@link getUserById} for more information on getting a user by id
 * @see {@link disableUser} for more information on disabling a user
 */
export const disableUserWithRole = async (reqBody: any, userRole: string) => {
  const user = await getUserById(reqBody.userToDisableId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== userRole) {
    throw new Error('Forbidden');
  }

  return await disableUser(user.id);
};

export const activateUserWithRole = async (reqBody: any, userRole: string) => {
  const user = await getUserById(reqBody.userToActivateId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== userRole) {
    throw new Error('Forbidden');
  }

  return await activateUser(user.id);
};

/**
 * @function updateUserWithRole
 * @description Updates a user with the given user object and role
 * @param {any} reqBody - the user object
 * @param {string} userRole - the user role
 * @returns {Promise<User>} a promise that resolves with the updated user
 * @throws {Error} - if the user is not found or the user role is forbidden
 * @see {@link getUserById} for more information on getting a user by id
 * @see {@link updateUser} for more information on updating a user
 */
export const updateUserWithRole = async (reqBody: any, userRole: string) => {
  const user = await getUserById(reqBody.updatedUserId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== userRole) {
    throw new Error('Forbidden');
  }

  const {
    email,
    firstName,
    lastName,
    photoUrl,
    phoneNumber,
    trainerIds,
    userIds,
    userStatus,
  } = reqBody.updatedUser;

  const updatedUser = {
    email,
    firstName,
    lastName,
    role: userRole,
    photoUrl,
    phoneNumber,
    trainerIds,
    userIds,
    userStatus,
  };

  return await updateUser(user.id, updatedUser);
};

export async function addClientToTrainer(clientId: string, trainerId: string) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await UserModel.findOneAndUpdate(
      { _id: trainerId },
      { $addToSet: { userIds: clientId } },
      { session: session },
    );
    await UserModel.findOneAndUpdate(
      { _id: clientId },
      { $addToSet: { trainerIds: trainerId } },
      { session: session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}

export async function removeClientFromTrainer(
  clientId: string,
  trainerId: string,
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await UserModel.findOneAndUpdate(
      { _id: trainerId },
      { $pull: { userIds: clientId } },
      { session: session },
    );
    await UserModel.findOneAndUpdate(
      { _id: clientId },
      { $pull: { trainerIds: trainerId } },
      { session: session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}
