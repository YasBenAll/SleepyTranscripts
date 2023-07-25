import React from 'react';
import localFont from '@next/font/local';

const pirata = localFont({
  src: '../../fonts/PirataOne-Regular.ttf',
  variable: '--font-amatic',
})

const NameBox = ({ name, isChecked, handleToggleCheckbox, image }) => {
  return (
    <div
      style={pirata.style}
      className={`text-center inline-block m-2 p-2 border rounded cursor-pointer ${
        isChecked ? 'bg-blue-100' : ''
      }`}
      onClick={handleToggleCheckbox}
    >
      <img src={image} alt={name} className="w-20 h-20" />
      {name}
    </div>
  );
};

export default NameBox;