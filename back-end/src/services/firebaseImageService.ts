import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import {
  ImageServiceInterface,
  ImageData,
} from '../types/ImageServiceInterface';
const storage = require('../config/firebase');

export class FirebaseImageService implements ImageServiceInterface {
  async uploadImage(file: ImageData): Promise<string> {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`; // Generate a unique UUID for the image name in fb and url
    const imageRef = ref(storage, uniqueFileName);
    const metatype = { contentType: file.mimetype, name: uniqueFileName };
    await uploadBytes(imageRef, file.buffer, metatype);
    const imageReferenceURL = `https://firebasestorage.googleapis.com/v0/b/${storage._bucket.bucket}/o/${uniqueFileName}?alt=media`;
    return imageReferenceURL;
  }

  async uploadImageFromDataUrl(dataUrl: string): Promise<string> {
    try {
      const uniqueFileName = `${uuidv4()}.png`;
      const imageRef = ref(storage, uniqueFileName);

      // Конвертуємо dataUrl в base64
      const base64Image = dataUrl.split(';base64,').pop();

      if (!base64Image) {
        throw new Error('Unable to find base64 data for the image.');
      }

      // Завантажуємо зображення у форматі base64 до Firebase
      await uploadBytes(imageRef, Buffer.from(base64Image, 'base64'));

      // Формуємо URL завантаженого зображення
      const imageDownloadURL = await getDownloadURL(imageRef);
      return imageDownloadURL;
    } catch (error) {
      console.error('Помилка завантаження зображення:', error);
      throw new Error('Помилка завантаження зображення');
    }
  }
}
