import { Request, Response } from 'express';
import {
  getMailTemplateByNameService,
  getMailTemplateNamesService,
  saveMailTemplateService,
} from '../services/Mail/mailTemplateService';
const { sendCustomEmail } = require('../services/Mail/mailService');

/**
 * @function sendMailTemplate
 * @description Sends a mail template to a list of emails
 * @param {Request} req - The request object from the client (mails, html, subject)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link sendCustomEmail} for more information about that service
 */
export const sendMailTemplate = async (req: Request, res: Response) => {
  try {
    const { mails, html, subject } = req.body;
    if (!mails || !html || !subject) {
      throw new Error('Mail or template is empty');
    }
    await sendCustomEmail(mails, subject, html);
    return res.status(200).send('message was sent');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }

    return res.status(500).send('Internal server error at /sendMailTemplate');
  }
};

/**
 * @function saveMailTemplate
 * @description Saves a mail template
 * @param {Request} req - The request object from the client (name, template)
 * @param {Response} res - The response object sent to the client
 * @method POST
 * @returns {Promise<void>} The response object sent to the client (status code)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link saveMailTemplateService} for more information about that service
 */
export const saveMailTemplate = async (req: Request, res: Response) => {
  try {
    const { name, template } = req.body;
    await saveMailTemplateService(name, template);
    return res.status(200).send('message was sent');
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send('Internal server error at /saveMailTemplate');
  }
};

/**
 * @function getMailTemplateByName
 * @description Gets a mail template by name
 * @param {Request} req - The request object from the client (template name)
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (template)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link getMailTemplateByNameService} for more information about that service
 */
export const getMailTemplateByName = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const template = await getMailTemplateByNameService(name);
    if (!template) {
      return res.status(404).send('template with this name was not founded');
    }
    return res.status(200).send({ template });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    return res
      .status(500)
      .send('Internal server error at /getMailTemplateByName');
  }
};

/**
 * @function getMailTemplateNames
 * @description Gets all mail template names
 * @param {Request} req - The request object from the client
 * @param {Response} res - The response object sent to the client
 * @method GET
 * @returns {Promise<void>} The response object sent to the client (names)
 * @throws {Error} - returns 400 status code with error message if error occurs
 * @see {@link getMailTemplateNamesService} for more information about that service
 */
export const getMailTemplateNames = async (req: Request, res: Response) => {
  try {
    const names = await getMailTemplateNamesService();
    return res.status(200).send({ names });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    return res
      .status(500)
      .send('Internal server error at /getMailTemplateNames');
  }
};
