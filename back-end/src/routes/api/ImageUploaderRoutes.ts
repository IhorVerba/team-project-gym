import express, { Request } from 'express';
import { FirebaseImageService } from '../../services/firebaseImageService';
const authMe = require('../../middleware/authMe');
const multer = require('multer');
const userService = require('../../services/userService');

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

/**
 * @module ImageUploaderRoutes
 * @description Router for image uploading. Mounted on /api/image-uploader.
 * @type {express.Router}
 * @const
 */
const router = express.Router();
const imageService = new FirebaseImageService();

/**
 * @interface ImageData
 * @description Interface for image data
 * @property {string} fieldname - The field name of the image
 * @property {string} originalname - The original name of the image
 * @property {string} encoding - The encoding of the image
 * @property {string} mimetype - The mime type of the image
 * @property {Buffer} buffer - The buffer of the image
 * @property {number} size - The size of the image
 */
interface ImageData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

/**
 * @interface MulterRequest
 * @description Interface for multer request
 * @extends {Request}
 * @property {ImageData} file - The image data
 * @see {@link ImageData} for more information about that interface
 */
interface MulterRequest extends Request {
  file: ImageData;
}

/**
 * @name POST /api/image-uploader/addPicture
 * @description Uploads an image to the server
 * @function
 * @param {MulterRequest} req - The request
 * @param {Response} res - The response
 */
router.post('/addPicture', upload.single('pic'), authMe, async (req, res) => {
  try {
    const file = (req as MulterRequest).file;
    const imageUrl = await imageService.uploadImage(file);
    const user = req.body.user;
    const updateUserPhoto = await userService.updateUser(user.id, {
      ...user,
      photoUrl: imageUrl,
    });

    if (updateUserPhoto) {
      res.send({
        success: true,
        message: 'Image uploaded successfully.',
        url: imageUrl,
      });
    } else {
      res.send({ success: false, message: 'Failed to update user photo.' });
    }
  } catch (error) {
    res.status(500).send('Error uploading image.');
  }
});

router.post('/saveChartImage', upload.single('image'), async (req, res) => {
  try {
    const imageDataUrl = req.body.imageDataUrl;

    if (!imageDataUrl)
      return res.status(400).send('No image data URL provided');

    const imageUrl = await imageService.uploadImageFromDataUrl(imageDataUrl);

    res.send(imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;
