import { useState } from 'react';

interface LogoHoverProps {
    bwSrc: string;
    goldSrc: string;
    alt: string;
    height?: number;
}

export default function LogoHover({ bwSrc, goldSrc, alt, height = 40 }: LogoHoverProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="logo-hover-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                height: `${height}px`,
                display: 'inline-block',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(2)' : 'scale(1)',
            }}
        >
            <img
                src={bwSrc}
                alt={alt}
                height={height}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    height: `${height}px`,
                    width: 'auto',
                    filter: 'invert(1) brightness(1.2)', // Invert black to white
                }}
            />
            <img
                src={goldSrc}
                alt={alt}
                height={height}
                style={{
                    position: 'relative',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    height: `${height}px`,
                    width: 'auto',
                }}
            />
        </div>
    );
}
