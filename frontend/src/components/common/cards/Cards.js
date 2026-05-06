'use client';

import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function Cards({ icon, title, description, iconClassName }) {
  return (
    <div
      className="
      flex flex-col gap-4 
      p-8 
      rounded-3xl 
      border border-gray-200 
      bg-white 
      shadow-md 
      hover:shadow-xl 
      transition-all 
      duration-300
      max-w-80
    "
    >
      {/* Icono */}
      {icon && (
        <div
          className={`
          w-16 h-16 
          flex items-center justify-center 
          rounded-2xl 
          ${iconClassName || 'bg-gray-100 text-primary-normal'} 
        `}
        >
          <Icon name={icon} size={32} strokeWidth={1.5} />
        </div>
      )}

      {/* Título */}
      <Poppins
        tag="h3"
        text={title}
        size="18|22"
        weight="bold"
        color="textPrimary"
        className="leading-tight"
      />

      {/* Descripción */}
      <Poppins
        tag="p"
        text={description}
        size="14|16"
        color="textSecondary"
        className="leading-relaxed"
      />
    </div>
  );
}
