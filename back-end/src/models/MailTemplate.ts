import mongoose, { Schema, Document } from 'mongoose';

/**
 * @interface MailTemplate
 * @description Interface for MailTemplate
 * @extends Document
 * @property {string} name - The name of the mail template
 * @property {Schema.Types.Mixed} template - The template of the mail
 */
interface MailTemplate extends Document {
  name: { type: string; required: boolean };
  template: { type: Schema.Types.Mixed; required: boolean };
}

/**
 * @constant MailTemplateSchema
 * @description Schema for MailTemplate
 * @type {Schema<MailTemplate>}
 * @property {string} name - The name of the mail template
 * @property {Schema.Types.Mixed} template - The template of the mail
 * @see {@link MailTemplate} for more information about that interface
 */
const MailTemplateSchema = new Schema<MailTemplate>({
  name: { type: String, required: true },
  template: { type: Schema.Types.Mixed, required: true },
});

export const MailTemplateModel = mongoose.model(
  'MailTemplate',
  MailTemplateSchema,
);
