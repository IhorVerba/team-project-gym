import { Schema } from 'mongoose';
import { MailTemplateModel } from '../../models/MailTemplate';

/**
 * @function checkTemplateNameExists
 * @description Check if a template with the given name exists
 * @param {string} name - the name of the template
 * @returns {Promise<boolean>} a promise that resolves with a boolean indicating whether a template with the given name exists
 * @see {@link MailTemplateModel} for more information on checking if a document exists in the database
 */
const checkTemplateNameExists = async (name: string) => {
  return await MailTemplateModel.exists({ name: name });
};

/**
 * @function saveMailTemplateService
 * @description Save a new mail template with the given name and template
 * @param {string} name - the name of the template
 * @param {Schema.Types.Mixed} template - the template to save
 * @returns {Promise<void>} a promise that resolves when the template is saved
 * @throws {Error} - if a template with the given name already exists
 * @see {@link checkTemplateNameExists} for more information on checking if a template with the given name exists
 * @see {@link MailTemplateModel} for more information on saving a new mail template
 */
export const saveMailTemplateService = async (
  name: string,
  template: Schema.Types.Mixed,
) => {
  const exists = await checkTemplateNameExists(name);
  if (exists) {
    throw new Error('Template with this name already exists');
  }
  await MailTemplateModel.create({
    name,
    template,
  });
};

/**
 * @function updateMailTemplateService
 * @description Update the template with the given name
 * @param {string} name - the name of the template
 * @param {Schema.Types.Mixed} template - the new template
 * @returns {Promise<void>} a promise that resolves when the template is updated
 * @throws {Error} - if a template with the given name does not exist
 * @see {@link checkTemplateNameExists} for more information on checking if a template with the given name exists
 * @see {@link MailTemplateModel} for more information on updating a mail template
 */
export const getMailTemplateByNameService = async (name: string) => {
  const mailTemplate = await MailTemplateModel.findOne({
    name,
  });
  return mailTemplate?.template;
};

/**
 * @function getMailTemplateNamesService
 * @description Get the names of all mail templates
 * @returns {Promise<string[]>} a promise that resolves with an array of mail template names
 * @see {@link MailTemplateModel} for more information on getting all mail template names
 */
export const getMailTemplateNamesService = async () => {
  const mailTemplateNames = await MailTemplateModel.find(
    {},
    'name -_id',
  ).exec();
  return mailTemplateNames.map((t) => t.name);
};
