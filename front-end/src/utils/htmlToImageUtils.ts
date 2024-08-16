import * as htmlToImage from 'html-to-image';
import { saveImage } from '../services/reportService';
import dayjs from 'dayjs';

export const downloadHtmlAsImage = async (elementId: string, chartName?: string) => {
  const element = document.getElementById(elementId);

  if (element) {
    try {
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement('a');
      const currentDateTime = dayjs().format('YYYY-MM-DD-HH-mm-ss');
      link.download = `${chartName}-chart-${currentDateTime}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error converting chart to image:', error);
    }
  }
};

export const shareHtmlElementToTelegram = async (elementId: string) => {
  const chartElement = document.getElementById(elementId);
  if (chartElement) {
    try {
      const dataUrl = await htmlToImage.toPng(chartElement);
      const imageUrl = await saveImage(dataUrl);

      // TODO: write the text for messages
      const encodedText = '';
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(encodedText)}`;

      window.open(telegramShareUrl, '_blank');
    } catch (error) {
      console.error('Error sharing chart:', error);
    }
  }
};
