/**
 * @interface ImageServiceInterface
 * @description Image service interface
 * @param {string} fieldname - Image field name
 * @param {string} originalname - Image original name
 * @param {string} encoding - Image encoding
 * @param {string} mimetype - Image MIME type
 * @param {Buffer} buffer - Image buffer
 * @param {number} size - Image size
 */
export interface ImageData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

/**
 * @interface ImageServiceInterface
 * @description Image service interface
 * @function uploadImage
 * @param {ImageData} file - Image data
 * @returns {Promise<string>} - Image URL
 */
export interface ImageServiceInterface {
  uploadImage(file: ImageData): Promise<string>;
}
