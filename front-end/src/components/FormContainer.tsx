import {
  Container,
  Paper,
  Text,
  PaperProps,
  Title,
  rem,
  StyleProp,
  MantineSpacing,
} from '@mantine/core';
import React from 'react';
import { titleProps } from '../styles/styleProps';

/**
 * @interface FormContainerProps - FormContainer component props
 * @property {React.ReactNode} children - React children
 * @property {PaperProps} paperProps - paper component props
 * @property {string} title - form title
 * @property {string} subtitle - form subtitle
 * @property {StyleProp<React.CSSProperties['width']>} width - form width
 * @property {StyleProp<MantineSpacing>} marginTop - form margin top
 * @see {@link PaperProps} for Paper component props
 */
interface FormContainerProps {
  children: React.ReactNode;
  paperProps?: PaperProps;
  title: string;
  subtitle?: string;
  width?: StyleProp<React.CSSProperties['width']>;
  marginTop?: StyleProp<MantineSpacing>;
}

/**
 * @function FormContainer
 * @description FormContainer component to wrap form components
 * @param {FormContainerProps} props - component props
 * @returns {React.ReactElement} React component
 * @see {@link FormContainerProps} for component props
 */
export const FormContainer: React.FC<FormContainerProps> = ({
  paperProps,
  children,
  title,
  subtitle,
  width,
  marginTop,
}) => {
  return (
    <Container
      py="md"
      mt={marginTop ? marginTop : rem(20)}
      size={'responsive'}
      w={width ? width : { base: '100%', xs: 500 }}
    >
      <Paper radius="md" {...paperProps}>
        <Title ta="center" {...titleProps}>
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
