/** This file contains the default props for the component */

/**
 * The default props for the button.
 * @constant buttonProps
 * @type {object}
 * @property {string} variant - The variant of the button.
 * @property {object} gradient - The gradient of the button.
 * @property {string} gradient.from - The start color of the gradient.
 * @property {string} gradient.to - The end color of the gradient.
 * @property {number} gradient.deg - The degree of the gradient.
 * @property {string} fz - The font size of the button.
 * @property {string} w - The width of the button.
 * @property {string} h - The height of the button.
 * @property {string} fw - The font weight of the button.
 * @property {string} m - The margin of the button.
 */
export const buttonProps = {
  variant: 'gradient',
  gradient: {
    from: 'primary-color.9',
    to: 'primary-color.5',
    deg: 50,
  },
  fz: 'sm',
  w: '11rem',
  h: '2.5rem',
  fw: 500,
  m: 0,
};

/**
 * The default props for the icon button.
 * @constant iconButtonProps
 * @type {object}
 * @property {string} variant - The variant of the button.
 * @property {object} gradient - The gradient of the button.
 * @property {string} gradient.from - The start color of the gradient.
 * @property {string} gradient.to - The end color of the gradient.
 * @property {number} gradient.deg - The degree of the gradient.
 * @property {string} w - The width of the button.
 * @property {string} h - The height of the button.
 * @property {string} p - The padding of the button.
 */
export const iconButtonProps = {
  variant: 'gradient',
  gradient: {
    from: 'primary-color.9',
    to: 'primary-color.5',
    deg: 50,
  },
  w: '2.5rem',
  h: '2.5rem',
  p: 0,
};

/**
 * The default props for the form button.
 * @constant formButtonProps
 * @type {object}
 * @property {string} variant - The variant of the button.
 * @property {object} gradient - The gradient of the button.
 * @property {string} gradient.from - The start color of the gradient.
 * @property {string} gradient.to - The end color of the gradient.
 * @property {number} gradient.deg - The degree of the gradient.
 * @property {string} fz - The font size of the button.
 * @property {string} w - The width of the button.
 * @property {string} fw - The font weight of the button.
 * @property {string} m - The margin of the button.
 */
export const formButtonProps = {
  variant: 'gradient',
  gradient: {
    from: 'primary-color.9',
    to: 'primary-color.5',
    deg: 50,
  },
  size: 'md',
  fz: 'md',
  w: '6rem',
  fw: 500,
  m: 0,
};

export const cardBadgeProps = {
  variant: 'gradient',
  gradient: {
    from: 'primary-color.9',
    to: 'primary-color.5',
    deg: 50,
  },
};

export const inActiveCardBadgeProps = {
  variant: 'gradient',
  gradient: {
    from: 'gray',
    to: 'gray',
    deg: 50,
  },
};

/**
 * The default props for the title.
 * @constant titleProps
 * @type {object}
 * @property {string} fz - The font size of the title.
 * @property {string} fw - The font weight of the title.
 * @property {string} ff - The font family of the title.
 */
export const titleProps = {
  fz: 'lg',
  fw: 700,
};

/**
 * The default props for the section.
 * @constant sectionProps
 * @type {object}
 * @property {boolean} fluid - The fluid property of the section.
 * @property {string} w - The width of the section.
 */
export const sectionProps = {
  fluid: true,
  w: '100%',
};

/**
 * The default props for the heading elements.
 * @constant headingElementsProps
 * @type {object}
 * @property {string} w - The width of the heading elements.
 * @property {string} h - The height of the heading elements.
 * @property {string} fz - The font size of the heading elements.
 * @property {string} size - The size of the heading elements.
 * @property {string} radius - The radius of the heading elements.
 */
export const headingElementsProps = {
  w: '11rem',
  h: '2.5rem',
  fz: 'md',
  size: 'md',
  radius: 'sm',
};

/**
 * The default props for the form paper.
 * @constant formPaperProps
 * @type {object}
 * @property {string} radius - The radius of the form paper.
 * @property {boolean} withBorder - The border property of the form paper.
 * @property {string} px - The padding x of the form paper.
 * @property {string} py - The padding y of the form paper.
 * @property {string} shadow - The shadow of the form paper.
 * @property {string} mt - The margin top of the form paper.
 */
export const formPaperProps = {
  radius: 'md',
  withBorder: true,
  px: '20px',
  py: '20px',
  shadow: 'md',
  mt: 'md',
};

/**
 * The default props for the form group.
 * @constant formGroupProps
 * @type {object}
 * @property {string} gap - The gap of the form group.
 * @property {string} justify - The justify of the form group.
 */
export const cardPaperProps = {
  radius: 'md',
  withBorder: true,
  p: 'sm',
  h: '100%',
  shadow: 'md',
  className: 'pointer',
  bg: 'white',
};

/**
 * The default props for the form group.
 * @constant formGroupProps
 * @type {object}
 * @property {string} gap - The gap of the form group.
 * @property {string} justify - The justify of the form group.
 */
export const cardFlexProps = {
  justify: 'space-between',
  align: 'center',
  gap: 'sm',
  h: '100%',
};

/**
 * The default props for the form group.
 * @constant formGroupProps
 * @type {object}
 * @property {string} gap - The gap of the form group.
 * @property {string} justify - The justify of the form group.
 */
export const cardTitleProps = {
  fz: 'md',
  fw: 500,
};

/**
 * The default props for the form group.
 * @constant formGroupProps
 * @type {object}
 * @property {string} gap - The gap of the form group.
 * @property {string} justify - The justify of the form group.
 */
export const chartProps = {
  h: '100%',
  mah: 1000,
  w: '100%',
  maw: 820,
};
