'use client';

import TitleComponent from '@/components/common/TitleComponent';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

export default function ContactLeft({ t }) {
  const infoArray = t.raw('info');
  const icons = ['Headset', 'Mail', 'MapPin'];

  return (
    <div className="space-y-10">
      {/* TITLE */}
      <TitleComponent title={t('title')} subtitle={t('subtitle')} align="left" />

      {/* CONTACT INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoArray.map((item, index) => {
          const isLocation = index === 2; // Ubicación (tercer elemento)

          return (
            <div
              key={index}
              className={`
                bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-start gap-4
                ${isLocation ? 'md:col-span-2' : 'col-span-1'}
              `}
            >
              <div className="bg-primary/10 p-2.5 rounded-xl flex-shrink-0">
                <Icon name={icons[index]} size={22} className="text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <Poppins
                  text={item.title}
                  tag="h4"
                  size="16|20"
                  className="tracking-wider text-primary mb-0.5"
                />
                <Poppins
                  text={item.value}
                  color="textPrimary"
                  size="16|16"
                  className={`break-words leading-tight ${isLocation ? 'text-lg' : 'text-base'}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl">
        <Poppins text={t('driver.title')} tag="h3" weight="semibold" className="mb-2" />
        <Poppins text={t('driver.text')} color="textSecondary" className="max-w-md" />
      </div>
    </div>
  );
}
