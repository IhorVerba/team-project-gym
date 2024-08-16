/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Flex, ColorInput, Button, Alert, Text, Center } from '@mantine/core';
import { FormContainer } from '../../components/FormContainer';
import useColors from '../../hooks/useColors';
import { buttonProps } from '../../styles/styleProps';
import Loader from '../../components/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';

/**
 * @function CompanyPage
 * @description This component of page is used to set colors for the website. Here we can find 3 inputs where we can set colors for primary, secondary and background elements.
 * @see {@link FormContainer} component
 * @see {@link Loader} component
 * @returns CompanyPage component
 */
const CompanyPage: React.FC = () => {
  const { error, colors, setColors, submitColors, loading } = useColors();
  const { t } = useTranslation();

  if (loading || !colors) {
    return (
      <Center h="80vh">
        <Loader />
      </Center>
    );
  }

  return (
    <FormContainer
      title={t('companyPage.title')}
      subtitle={t('companyPage.subtitle')}
    >
      <form
        onSubmit={(event) => {
          submitColors(event, colors);
        }}
      >
        <Flex direction={'column'} gap="sm" mt={20}>
          {Object.keys(colors).map((colorKey) => (
            <ColorInput
              key={colorKey}
              label={t(`companyPage.label.${colorKey.slice(0, -5)}` as any)}
              description={t(
                `companyPage.description.${colorKey.slice(0, -5)}` as any,
              )}
              withEyeDropper
              value={colors[colorKey as keyof typeof colors]}
              name={colorKey}
              onChange={(value: string) => {
                setColors({ ...colors, [colorKey]: value });
              }}
            />
          ))}
          {error && <Alert variant="outline" color="red" title={error} />}
          <Flex direction="column" align="end" mt="sm">
            <Button type="submit" {...buttonProps}>
              {t('companyPage.save')}
            </Button>
            <Text c="dimmed" size="sm">
              {t('companyPage.reload')}
            </Text>
          </Flex>
        </Flex>
      </form>
    </FormContainer>
  );
};

export default CompanyPage;
