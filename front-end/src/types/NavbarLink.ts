import { TablerIconsProps } from '@tabler/icons-react';

/**
 * @interface NavbarLink - Used for the Navbar component.
 * @property {string} link - link to the page
 * @property {string} label - label of the link
 * @property {(props: TablerIconsProps) => JSX.Element} icon - icon of the link
 */
export interface NavbarLink {
  link: string;
  label?: string;
  icon?: (props: TablerIconsProps) => JSX.Element;
}
