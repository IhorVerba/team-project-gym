/**
 * @enum LANGUAGES
 * @description The languages enum
 * @property {string} EN - The English language
 * @property {string} UK - The Ukrainian language
 */
export enum LANGUAGES {
  EN = 'EN',
  UK = 'УКР',
}

/**
 * @constant LOCALS
 * @description The locals constant
 * @type {object}
 * @property {string} EN - The English language
 * @property {string} UK - The Ukrainian language
 */
export const LOCALS: { [key in LANGUAGES]: string } = {
  [LANGUAGES.EN]: 'en-US',
  [LANGUAGES.UK]: 'uk',
};
