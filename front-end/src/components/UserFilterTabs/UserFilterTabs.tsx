import { useState } from 'react';
import { useFilterContext } from '../../context/FilterContext';
import { Tabs } from '@mantine/core';
import { generateTabs } from '../../utils/filterTabsHelper';
import classes from './UserFilterTabs.module.scss';
import { useAuthContext } from '../../context/AuthContext';

type Props = {
  isTraining?: boolean;
};

/**
 * @function UserFilterTabs component
 * @description - This component renders a tab list with user filters
 * @returns {JSX.Element} - Rendered UserFilterTabs component
 * @see {@link FilterContext} for FilterContext
 */
const UserFilterTabs: React.FC<Props> = ({ isTraining }) => {
  const { user } = useAuthContext();
  const { selectedFilter, setSelectedFilter } = useFilterContext();

  const [activeTab, setActiveTab] = useState<string>(selectedFilter);

  const tabs = generateTabs(user?.role, isTraining);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value || '');
    setSelectedFilter(value || '');
  };

  return (
    <Tabs
      w="100%"
      value={activeTab}
      mt="lg"
      onChange={handleTabChange}
      classNames={classes}
    >
      <Tabs.List justify="end">
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.label} value={tab.value} fz="sm">
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default UserFilterTabs;
