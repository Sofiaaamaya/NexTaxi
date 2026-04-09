import Poppins from '../ui/Poppins';

export default function TitleComponent({
  eyebrow,
  title,
  subtitle,
  align = 'center',

  eyebrowColor = 'primary',
  titleColor = 'textPrimary',
  subtitleColor = 'textSecondary',

  eyebrowAsBadge = false,

  layout = 'default',
  children,
}) {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const subtitleAlignment = align === 'center' ? 'mx-auto' : 'mx-0';

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* COLUMNA IZQUIERDA: TÍTULOS */}
        <div className={`${alignment[align]}`}>
          {eyebrow && (
            <Poppins
              text={eyebrow}
              tag="p"
              size="14|16"
              color={eyebrowColor}
              weight="medium"
              className={
                eyebrowAsBadge
                  ? 'uppercase mb-3 inline-block bg-slate-100/30 text-white px-3 py-1 rounded-full'
                  : 'uppercase mb-2'
              }
            />
          )}

          <Poppins text={title} tag="h2" size="24|32" color={titleColor} weight="semibold" />

          {subtitle && (
            <Poppins
              text={subtitle}
              tag="p"
              size="16|20"
              color={subtitleColor}
              className={`mt-2 text-justify max-w-xl ${subtitleAlignment}`}
            />
          )}
        </div>

        {/* COLUMNA DERECHA: CONTENIDO */}
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className={`mb-10 ${alignment[align]}`}>
      {eyebrow && (
        <Poppins
          text={eyebrow}
          tag="p"
          size="14|16"
          color={eyebrowColor}
          weight="medium"
          className={
            eyebrowAsBadge
              ? 'uppercase mb-3 inline-block bg-slate-100/30 text-white px-3 py-1 rounded-full'
              : 'uppercase mb-2'
          }
        />
      )}

      <Poppins text={title} tag="h2" size="24|32" color={titleColor} weight="semibold" />

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
