import React from 'react';

export interface CheerioLogoProps {
  size?: number;
  color?: string;
  className?: string;
  showWordmark?: boolean;
  wordmarkColor?: string;
}

export function CheerioLogo({
  size = 40,
  color = '#FF4600',
  className = '',
  showWordmark = false,
  wordmarkColor = 'white',
}: CheerioLogoProps) {
  const svgIcon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={showWordmark ? 'shrink-0' : className}
    >
      <path d="M372.385,355.793c0,13.989 -11.67,25.33 -26.066,25.33l-194.824,0c-5.287,0 -9.58,4.172 -9.58,9.31l0,86.649c0,5.138 4.293,9.31 9.58,9.31l234.752,0c5.287,0 9.58,-4.172 9.58,-9.31l0,-17.31c0,-13.989 11.67,-25.33 26.066,-25.33l47.096,0c4.894,0 8.867,-3.861 8.867,-8.616l0,-229.512c0,-4.755 -3.973,-8.616 -8.867,-8.616l-47.096,0c-14.396,-0 -26.066,-11.341 -26.066,-25.33l0,-18.448c0,-5.593 -4.673,-10.133 -10.428,-10.133l-233.057,0c-5.755,0 -10.428,4.541 -10.428,10.133l0,88.296c0,5.593 4.673,10.133 10.428,10.133l193.976,0c14.396,-0 26.066,11.341 26.066,25.33l0,88.116Z" />
      <path d="M127.615,144.207c-0,-13.989 11.67,-25.33 26.066,-25.33l194.824,0c5.287,0 9.58,-4.172 9.58,-9.31l0,-86.649c0,-5.138 -4.293,-9.31 -9.58,-9.31l-234.752,0c-5.287,0 -9.58,4.172 -9.58,9.31l0,17.31c-0,13.989 -11.67,25.33 -26.066,25.33l-47.096,0c-4.894,0 -8.867,3.861 -8.867,8.616l0,229.512c0,4.755 3.973,8.616 8.867,8.616l47.096,0c14.396,0 26.066,11.341 26.066,25.33l0,18.448c0,5.593 4.673,10.133 10.428,10.133l233.057,0c5.755,0 10.428,-4.541 10.428,-10.133l0,-88.296c0,-5.593 -4.673,-10.133 -10.428,-10.133l-193.976,0c-14.396,0 -26.066,-11.341 -26.066,-25.33l0,-88.116Z" />
    </svg>
  );

  if (!showWordmark) {
    return svgIcon;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {svgIcon}
      <div 
        className="flex flex-col justify-center uppercase leading-none tracking-tight font-sans"
        style={{ color: wordmarkColor }}
      >
        <span className="font-bold text-xl tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>CHEERIO</span>
        <span className="font-light text-xl tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>STUDIOS</span>
      </div>
    </div>
  );
}

export default CheerioLogo;
