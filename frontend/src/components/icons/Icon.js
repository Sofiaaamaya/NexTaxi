'use client';

import { LUCIDE_ICONS } from '../../lib/constants/icons';

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  className = '',
  style = {},
}) {
  const LucideIcon = LUCIDE_ICONS[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in LUCIDE_ICONS`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
    />
  );
}
