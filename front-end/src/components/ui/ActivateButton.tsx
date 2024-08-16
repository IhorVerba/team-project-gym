import { Button } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';
import { iconButtonProps } from '../../styles/styleProps';

type Props = {
  openConfirm: () => void;
  activateLoading: boolean;
};

const ActivateButton: React.FC<Props> = ({ openConfirm, activateLoading }) => {
  return (
    <Button
      onClick={openConfirm}
      {...iconButtonProps}
      bg="secondary-color.9"
      loading={activateLoading}
    >
      <IconUserPlus size={16} />
    </Button>
  );
};
export default ActivateButton;
