import { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const sizeConfig = {
  '14|16': 'text-[14px] md:text-[16px] leading-[120%] md:leading-[120%]',
  '16|16': 'text-[16px] leading-[130%] md:leading-[130%]',
  '16|20': 'text-[16px] md:text-[20px] leading-[130%] md:leading-[130%]',
  '16|32': 'text-[16px] md:text-[32px] leading-[130%] md:leading-[120%]',
  '18|22': 'text-[18px] md:text-[22px] leading-[130%] md:leading-[120%]',
  '20|24': 'text-[20px] md:text-[24px] leading-[130%] md:leading-[120%]',
  '24|32': 'text-[24px] md:text-[32px] leading-[120%] md:leading-[110%]',
  '30|42': 'text-[30px] md:text-[42px] leading-[110%] md:leading-[110%]',
  '32|52': 'text-[32px] md:text-[52px] leading-[110%] md:leading-[110%]',
  '32|64': 'text-[32px] md:text-[64px] leading-[110%] md:leading-[100%]',
  '40|96': 'text-[40px] md:text-[96px] leading-[100%] md:leading-[100%]',
};

const getSizeClass = (size) => sizeConfig[size] || '';

const colorMap = {
  primary: 'text-[var(--color-primary)]',
  primaryLight: 'text-[var(--color-primary-light)]',
  textPrimary: 'text-[var(--color-text-primary)]',
  textSecondary: 'text-[var(--color-text-secondary)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  danger: 'text-[var(--color-danger)]',
  border: 'text-[var(--color-border)]',
  white: 'text-white',
  inherit: 'text-inherit',
};

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

export const Poppins = ({
  text,
  tag = 'p',
  size = '16|20',
  color = 'textPrimary',
  weight = 'normal',
  italic = false,
  className = '',
}) => {
  const Component = allowedTags.includes(tag) ? tag : 'p';

  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(text || '', {
      ADD_ATTR: ['target'],
    });
  }, [text]);

  const classes = clsx(
    'antialiased',
    getSizeClass(size),
    colorMap[color],
    weightMap[weight],
    italic && 'italic',
    className
  );

  return <Component className={classes} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

Poppins.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.oneOf(allowedTags),
  size: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(colorMap)),
  weight: PropTypes.oneOf(Object.keys(weightMap)),
  italic: PropTypes.bool,
  className: PropTypes.string,
};

export default Poppins;
