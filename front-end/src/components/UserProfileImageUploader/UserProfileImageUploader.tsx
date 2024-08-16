import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import { uploadUserProfileImage } from '../../services/userService';
import notification from '../../utils/notification';
import Loader from '../ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

/**
 * @interface UserProfileImageUploaderProps - interface for UserProfileImageUploader component
 * @property {string} photoUrl - user photo URL
 * @property {string} firstName - user first name
 * @property {string} lastName - user last name
 */
interface UserProfileImageUploaderProps {
  photoUrl: string;
  firstName: string;
  lastName: string;
}

/**
 * @function UserProfileImageUploader
 * @description - This component renders an image uploader for user profile
 * @param {UserProfileImageUploaderProps} props
 * @returns {JSX.Element} - Rendered UserProfileImageUploader component
 * @see {@link UserProfileImageUploaderProps} for UserProfileImageUploaderProps interface
 * @see {@link Avatar} for Avatar component
 */
function UserProfileImageUploader({
  photoUrl,
  firstName,
  lastName,
}: UserProfileImageUploaderProps) {
  const { t } = useTranslation();
  const { fetchUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const openRef = useRef<() => void>(null);

  /**
   * @function handleDrop
   * @description - Function to handle file drop event and upload user profile image
   * @param {FileWithPath[]} files - array of files dropped
   * @returns {Promise<void>} - Promise that resolves when file is uploaded
   * @throws an error if something went wrong and file was not uploaded
   * @see {@link uploadUserProfileImage} for uploadUserProfileImage function
   * @see {@link fetchUser} for fetchUser function
   * @see {@link notification} for notification function
   */
  const handleDrop = async (files: FileWithPath[]) => {
    const selectedFile = files[0];
    try {
      setIsLoading(true);
      await uploadUserProfileImage(selectedFile);
      await fetchUser();
    } catch (error) {
      notification({
        type: 'error',
        message: t('notification.Can not upload photo'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      openRef={openRef}
      onDrop={handleDrop}
      p="0"
      style={{
        border: 'none',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Avatar
          photoUrl={photoUrl}
          firstName={firstName[0]}
          lastName={lastName}
          size={94}
          radius="md"
          fontSize={24}
          isVertical
        />
      )}
    </Dropzone>
  );
}

export default UserProfileImageUploader;
