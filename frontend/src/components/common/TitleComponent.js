import Poppins from '../ui/Poppins';

export default function TitleComponent({
  eyebrow,
  title,
  subtitle,
  align = 'center',

  // Nuevos props opcionales
  eyebrowColor = 'primary',
  titleColor = 'textPrimary',
  subtitleColor = 'textSecondary',

  eyebrowAsBadge = false, // ← convierte eyebrow en badge
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Solo centrar el subtitle si align === center
  const subtitleAlignment = align === 'center' ? 'mx-auto' : 'mx-0';

  return (
    <div className={`mb-10 ${alignment[align]}`}>
      {/* EYEBROW */}
      {eyebrow && (
        <Poppins
          text={eyebrow}
          tag="p"
          size="14|16"
          color={eyebrowColor}
          weight="medium"
          className={
            eyebrowAsBadge
              ? 'uppercase mb-3 inline-block bg-slate-100/30  text-white px-3 py-1 rounded-full'
              : 'uppercase mb-2'
          }
        />
      )}

      {/* TITLE */}
      <Poppins text={title} tag="h2" size="24|32" color={titleColor} weight="semibold" />

      {/* SUBTITLE */}
      {subtitle && (
        <Poppins
          text={subtitle}
          tag="p"
          size="16|20"
          color={subtitleColor}
          className={`mt-2 max-w-2xl ${subtitleAlignment}`}
        />
      )}
    </div>
  );
}
