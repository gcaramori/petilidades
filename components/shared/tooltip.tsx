import React, { useState } from 'react'

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true)
  };

  const handleMouseLeave = () => {
    setShowTooltip(false)
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="absolute bottom-0 left-12 bg-gray-900 drop-shadow-md text-gray-100 font-semibold text-xs text-center w-28 rounded p-1">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;