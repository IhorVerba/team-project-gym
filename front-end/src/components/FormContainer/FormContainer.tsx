import { Container, Paper, Text, PaperProps, Title } from '@mantine/core';
import React from 'react';

/**
 * @interface FormContainerProps - The props for the FormContainer component.
 * @property {React.ReactNode} children - The children to be passed into the component.
 * @property {PaperProps} paperProps - The paper props for the component.
 * @property {string} title - The title of the form container.
 * @property {string} subtitle - The subtitle of the form container.
 */
interface FormContainerProps {
  children: React.ReactNode;
  paperProps: PaperProps;
  title: string;
  subtitle?: string;
}

/**
 * @function FormContainer - A component that displays the form container.
 * @param {FormContainerProps} props - The props to be passed into the component.
 * @returns The FormContainer component.
 * @see {@link FormContainerProps} - The props for the FormContainer component.
 */
export const FormContainer: React.FC<FormContainerProps> = ({
  paperProps,
  children,
  title,
  subtitle,
}) => {
  return (
    <Container w={{ base: '100%', xs: 500 }}>
      <Paper radius="md" {...paperProps}>
        <Title ta="center" fw="900" fz="26px">
          {title}
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          {subtitle}
        </Text>
        {children}
      </Paper>
    </Container>
  );
};
