import React, { useState, useRef } from 'react';
import { Button, Flex } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import axiosService from '../../services/axiosService';
import notification from '../../utils/notification';
import { useTranslation } from 'react-i18next';

/**
 * @function ImageUploader - A component that uploads an image.
 * @description The ImageUploader component uploads an image to the server from profile page.
 * @returns The ImageUploader component.
 */
function ImageUploader() {
  const [, setFile] = useState<FileWithPath | null>(null);

  const { t } = useTranslation();

  const openRef = useRef<() => void>(null);

  /**
   * @function handleUpload - Handles the upload of the image.
   * @param {FileWithPath} file - The file to upload.
   * @returns {void} The return the result of the function that uploads the image.
   * @throws The error when the photo was not uploaded.
   * @see {@link axiosService} - The axios service to make requests.
   */
  const handleUpload = async (file: FileWithPath) => {
    const formData = new FormData();
    formData.append('pic', file);
    try {
      await axiosService.post('imageUploader/addPicture', formData);
    } catch (error) {
      notification({ type: 'error', message: t('imageUploader.cantUpload') });
    }
  };

  /**
   * @function handleDrop - Handles the drop of the image.
   * @param {FileWithPath[]} files - The files to drop.
   * @returns {void} The return the result of the function that drops the image.
   * @see {@link handleUpload} - The function to handle the upload of the image.
   */
  const handleDrop = async (files: FileWithPath[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    await handleUpload(selectedFile);
  };

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} openRef={openRef} onDrop={handleDrop}>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Button>{t('imageUploader.upload')}</Button>
        </Flex>
      </Dropzone>
    </div>
  );
}

export default ImageUploader;
