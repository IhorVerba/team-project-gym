import axiosService from './axiosService';
import { JSONTemplate } from 'state/types/index';

/**
 * @function getMailTemplateNamesService - This service is used to get mail template names.
 * @async
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<string[]>} The result of the get mail template names request.
 */
export const getMailTemplateNamesService = async () => {
  const templates = await axiosService.get('/mail-template/names');
  return templates.data.names;
};

/**
 * @function sendMailTemplateService - This service is used to send a mail template.
 * @async
 * @param {string[]} mails - The mails to send.
 * @param {string} subject - The subject to send.
 * @param {string} html - The html to send.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the send mail template request.
 */
export const sendMailTemplateService = async (
  mails: string[],
  subject: string,
  html: string,
) => {
  await axiosService.post('/mail-template/send', {
    mails,
    subject,
    html,
  });
};

/**
 * @function saveMailTemplateService - This service is used to save a mail template.
 * @async
 * @param {string} name - The name to save.
 * @param {JSONTemplate} template - The template to save.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<void>} The result of the save mail template request.
 */
export const saveMailTemplateService = async (
  name: string,
  template: JSONTemplate,
) => {
  await axiosService.post('/mail-template/save', {
    name,
    template,
  });
};

/**
 * @function loadMailTemplateByNameService - This service is used to load a mail template by name.
 * @async
 * @param {string} name - The name to load.
 * @see {@link axiosService} for the request handling.
 * @returns {Promise<JSONTemplate>} The result of the load mail template by name request.
 */
export const loadMailTemplateByNameService = async (name: string) => {
  const templateResponse = await axiosService.get(
    `/mail-template/names/${name}`,
  );
  return templateResponse.data.template;
};
