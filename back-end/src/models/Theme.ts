import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

/**
 * @interface ThemeInterface
 * @description Interface for Theme
 * @extends Document
 * @property {string} primaryColor - The primary color
 * @property {string} secondaryColor - The secondary color
 * @property {string} backgroundColor - The background color
 */
interface ThemeInterface extends Document {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

/**
 * @constant themeSchema
 * @description Schema for Theme
 * @type {Schema<ThemeInterface>}
 * @property {string} primaryColor - The primary color for primary elements
 * @property {string} secondaryColor - The secondary color for secondary elements
 * @property {string} backgroundColor - The background color for the pages and components
 * @see {@link ThemeInterface} for more information about that interface
 */
const themeSchema = new Schema<ThemeInterface>({
  primaryColor: { type: String },
  secondaryColor: { type: String },
  backgroundColor: { type: String },
});

export default mongoose.model('Theme', themeSchema);
