import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(
      'https://wa.me/41764156658?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Fliegengitter-Lösungen.',
      '_blank'
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 99999,
        width: '34px',
        height: '34px',
      }}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-full bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        style={{ 
          position: 'relative',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="WhatsApp kontaktieren"
      >
      {/* Official WhatsApp Logo */}
      <svg
        viewBox="0 0 32 32"
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.825.738 5.482 2.031 7.784L0 32l8.401-2.004A15.931 15.931 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.365c-2.425 0-4.754-.649-6.761-1.877l-.485-.296-5.027 1.199 1.211-4.872-.323-.503A13.303 13.303 0 012.636 16C2.636 8.62 8.62 2.636 16 2.636S29.364 8.62 29.364 16 23.38 29.365 16 29.365z" />
        <path d="M23.193 19.655c-.403-.202-2.383-1.175-2.753-1.308-.37-.134-.64-.202-.909.201-.269.403-1.043 1.308-1.279 1.578-.236.269-.471.303-.874.101-.403-.202-1.701-.627-3.239-1.998-1.198-1.067-2.007-2.384-2.242-2.787-.236-.403-.025-.621.177-.822.182-.181.403-.471.604-.707.202-.236.269-.403.403-.672.135-.269.068-.504-.034-.706-.101-.202-.909-2.19-1.246-2.998-.328-.786-.662-.68-.909-.692-.236-.011-.504-.013-.773-.013s-.706.101-1.076.504c-.37.403-1.413 1.381-1.413 3.368s1.447 3.905 1.649 4.174c.202.269 2.849 4.349 6.899 6.097.963.416 1.715.664 2.301.85.967.307 1.847.264 2.543.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.236-1.914-.101-.168-.37-.269-.773-.471z" />
      </svg>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute right-20 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm hidden sm:block">
          WhatsApp Chat starten
          <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900"></div>
        </div>
      )}

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </button>
    </div>
  );
}

