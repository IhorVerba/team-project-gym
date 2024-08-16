import { Group, Skeleton } from '@mantine/core';

type Props = {
  tabCount: number;
};

export const SkeletonFilterTabs: React.FC<Props> = ({ tabCount }) => (
  <Group
    justify="flex-end"
    mt={20}
    w="100%"
    style={{ borderBottom: '2px solid #dee2e6' }}
    gap={5}
  >
    {[...Array(tabCount)].map((_, index) => (
      <Skeleton key={index} height={34} width={90} />
    ))}
  </Group>
);
