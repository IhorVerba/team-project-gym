/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CloseButton,
  Container,
  Flex,
  Input,
  Skeleton,
  Title,
} from '@mantine/core';
import UserRole from '../../types/UserRole';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { useRef } from 'react';
import { headingElementsProps, iconButtonProps } from '../../styles/styleProps';
import MobileCreateButton from '../ui/MobileCreateButton';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useFilterContext } from '../../context/FilterContext';
import { useTranslation } from 'react-i18next';

/**
 * @interface Props - interface for UserPageHeader component
 * @property {object} sectionProps - object with section props
 * @property {() => void} open - function to open the modal
 * @property {[Date | null, Date | null]} selectedDates - array of selected dates
 * @property {(value: DatesRangeValue) => void} setSelectedDates - function to set selected dates
 * @property {UserRole} userRole - user role
 * @property {string} pageTitle - page title
 * @property {string} buttonTitle - button title
 * @see {@link DatesRangeValue} for DatesRangeValue type
 * @see {@link UserRole} for UserRole enum
 */
type Props = {
  sectionProps: object;
  open: () => void;
  selectedDates?: [Date | null, Date | null];
  setSelectedDates?: (value: DatesRangeValue) => void;
  userRole: UserRole;
  pageTitle: string;
  buttonTitle: string;
  loading?: boolean;
};

/**
 * @function UserPageHeader component
 * @description - This component renders a header for user pages
 * @param {object} sectionProps - object with section props
 * @param {() => void} open - function to open the modal
 * @param {[Date | null, Date | null]} selectedDates - array of selected dates
 * @param {(value: DatesRangeValue) => void} setSelectedDates - function to set selected dates
 * @param {UserRole} userRole - user role
 * @param {string} pageTitle - page title
 * @param {string} buttonTitle - button title
 * @returns {JSX.Element} - Rendered UserPageHeader component
 * @see {@link UserRole} for UserRole enum
 * @see {@link DatesRangeValue} for DatesRangeValue type
 * @see {@link MobileCreateButton} for MobileCreateButton component
 */
export const UserPageHeader: React.FC<Props> = ({
  sectionProps,
  open,
  selectedDates,
  setSelectedDates,
  userRole,
  pageTitle,
  buttonTitle,
  loading,
}) => {
  const { searchValue, setSearchValue } = useFilterContext();

  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);
  const refSearch = useRef<HTMLInputElement>(null);

  /**
   * @function handleSendReports
   * @description - This function sends month reports to all clients
   * @returns {void} - This function return a result of sending reports - sends month reports to all clients
   * @throws an error notification if reports cannot be sent
   * @see {@link sendMountReports} for sendMountReports function
   * @see {@link notification} for notification function
   */

  const isMobile = useMediaQuery('(width <= 1080px)');

  return (
    <Container {...sectionProps} px={0}>
      <Flex
        gap="sm"
        direction={{
          base: 'column',
          xs: 'column',
          sm: 'row',
        }}
        align="center"
        justify="space-between"
      >
        <Title order={1} textWrap="wrap">
          {pageTitle || t(`${capitalizeFirstLetter(userRole)} page` as any)}
        </Title>
        <Flex
          direction="row"
          gap="sm"
          justify={{ sm: 'center' }}
          align="center"
          w={{ base: '100%', sm: 'auto' }}
        >
          {!loading ? (
            <Input
              placeholder={t('userPageHeader.Search')}
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              {...headingElementsProps}
              flex={{ base: 1, sm: 'auto' }}
              ref={refSearch}
              rightSectionPointerEvents="all"
              rightSectionProps={{ style: { cursor: 'text' } }}
              rightSection={
                <>
                  {searchValue ? (
                    <CloseButton
                      aria-label={t('userPageHeader.Clear input')}
                      onClick={() => setSearchValue('')}
                      style={{ display: searchValue ? undefined : 'none' }}
                    />
                  ) : (
                    <IconSearch
                      size={20}
                      onClick={() => {
                        if (refSearch.current) {
                          refSearch.current.focus();
                        }
                      }}
                    />
                  )}
                </>
              }
            />
          ) : (
            <Skeleton
              width="11rem"
              height="2.5rem"
              flex={{ base: 1, sm: 'auto' }}
            />
          )}

          {selectedDates &&
            setSelectedDates &&
            (!loading ? (
              <DatePickerInput
                type="range"
                placeholder={t('userPageHeader.Pick dates range')}
                value={selectedDates}
                onChange={setSelectedDates}
                clearable
                w="14rem"
                h="2.5rem"
                size="md"
                fz="md"
                ref={ref}
                style={{ display: isMobile ? 'none' : undefined }}
                dropdownType="modal"
                valueFormat="DD.MM.YY"
                maxDate={new Date()}
                rightSectionPointerEvents="all"
                rightSectionProps={{ style: { cursor: 'pointer' } }}
                rightSection={
                  <>
                    {selectedDates[0] === null && selectedDates[1] === null && (
                      <IconCalendar
                        size={20}
                        onClick={() => {
                          if (ref.current) {
                            ref.current.click();
                          }
                        }}
                      />
                    )}
                    {selectedDates[0] !== null && (
                      <CloseButton
                        aria-label={t('userPageHeader.Clear input')}
                        onClick={() => setSelectedDates([null, null])}
                      />
                    )}
                  </>
                }
              />
            ) : (
              !isMobile && (
                <Skeleton
                  width="11rem"
                  height="2.5rem"
                  flex={{ base: 1, sm: 'auto' }}
                />
              )
            ))}

          {selectedDates &&
            setSelectedDates &&
            isMobile &&
            (!loading ? (
              <Button
                {...iconButtonProps}
                onClick={() => {
                  if (ref.current) {
                    ref.current.click();
                  }
                }}
              >
                <IconCalendar size={20} />
              </Button>
            ) : (
              <Skeleton height="2.5rem" width="2.5rem" />
            ))}
          <MobileCreateButton
            open={open}
            buttonTitle={buttonTitle}
            loading={loading}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
