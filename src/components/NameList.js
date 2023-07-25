import Image from 'next/image';
import React from 'react';
import localFont from '@next/font/local';

const pirata = localFont({
  src: '../../public/fonts/PirataOne-Regular.ttf',
  variable: '--font-amatic',
})

const NameBox = ({ name, isChecked, handleToggleCheckbox, image }) => {
  return (
    <div
      style={pirata.style}
      className={`text-center hover:scale-105 transition-transform duration-200 inline-block m-2 p-2 border rounded cursor-pointer ${
        isChecked ? 'bg-violet-600/60' : ''
      }`}
      onClick={handleToggleCheckbox}
    >
      <Image src={image} alt={name} className="w-20 h-20" />
      {name}
    </div>
  );
};

export default NameBox;