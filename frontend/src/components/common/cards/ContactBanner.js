import Poppins from '@/components/ui/Poppins';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';

export default function ContactBanner({
  title,
  description,
  bgColor = '',
  textButton = '',
  buttonBg = '',
  buttonTextColor = '',
  buttonHoverBg = '',
  buttonHoverTextColor = '',
  titleColor = '',
  descriptionColor = '',
}) {
  return (
    <section className={`relative z-0 mx-auto my-5 rounded-3xl ${bgColor}`}>
      <div className="flex flex-col items-center text-center px-12 md:px-24 py-16 gap-4">
        <Poppins tag="h2" text={title} size="24|32" weight="bold" color={titleColor || 'white'} />

        <Poppins
          tag="p"
          text={description}
          size="14|16"
          color={descriptionColor || 'white'}
          className="w-full"
        />

        <Link
          href="/contacto"
          className={`
                        mt-2 rounded-3xl px-10 py-3 border-2 
                        flex items-center gap-2 transition-colors cursor-pointer
                        ${buttonBg} ${buttonTextColor}
                        ${buttonHoverBg && `hover:${buttonHoverBg}`}
                        ${buttonHoverTextColor && `hover:${buttonHoverTextColor}`}
                    `}
        >
          <Poppins tag="p" text={textButton} size="14|16" color={'inherit'} className="w-full" />
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </section>
  );
}
