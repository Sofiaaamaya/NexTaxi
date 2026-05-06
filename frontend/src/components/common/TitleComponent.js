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
    left: 'text-center lg:text-left',
    center: 'text-center',
    right: 'text-center lg:text-right',
  };

  const subtitleAlignment = align === 'left' ? 'mx-auto lg:mx-0' : 'mx-auto';
  const outlineIfWhite = (color) =>
    color === 'white' ? 'text-outline-white' : '';

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className={`${alignment[align]}`}>
          {eyebrow && (
            <Poppins
              text={eyebrow}
              tag="p"
              size="14|16"
              color={eyebrowColor}
              weight="medium"
              className={`${eyebrowAsBadge
                ? 'uppercase mb-3 inline-block bg-slate-100/30 text-white px-3 py-1 rounded-full'
                : 'uppercase mb-2'
              } ${outlineIfWhite(eyebrowColor)}`}
            />
          )}

          <Poppins
            text={title}
            tag="h2"
            size="24|32"
            color={titleColor}
            weight="semibold"
            className={outlineIfWhite(titleColor)}
          />

          {subtitle && (
            <Poppins
              text={subtitle}
              tag="p"
              size="16|20"
              color={subtitleColor}
              className={`mt-2 max-w-xl ${subtitleAlignment} ${outlineIfWhite(subtitleColor)}`}
            />
          )}
        </div>

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
          className={`${eyebrowAsBadge
            ? 'uppercase mb-3 inline-block bg-slate-100/30 text-white px-3 py-1 rounded-full'
            : 'uppercase mb-2'
          } ${outlineIfWhite(eyebrowColor)}`}
        />
      )}

      <Poppins
        text={title}
        tag="h2"
        size="24|32"
        color={titleColor}
        weight="semibold"
        className={outlineIfWhite(titleColor)}
      />

      {subtitle && (
        <Poppins
          text={subtitle}
          tag="p"
          size="16|20"
          color={subtitleColor}
          className={`mt-2 max-w-2xl ${subtitleAlignment} ${outlineIfWhite(subtitleColor)}`}
        />
      )}
    </div>
  );
}
