import React, { useRef, useState } from 'react';
import './Dock.css';

const Dock = ({ items, panelHeight = 68, baseItemSize = 50, magnification = 70 }) => {
  const [mouseX, setMouseX] = useState(null);

  return (
    <div className="dock-wrapper">
      <div 
        className="dock-container" 
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        style={{ height: panelHeight }}
      >
        <div className="dock-panel">
          {items.map((item, idx) => (
            <DockItem 
              key={idx} 
              item={item} 
              mouseX={mouseX} 
              baseItemSize={baseItemSize} 
              magnification={magnification} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DockItem = ({ item, mouseX, baseItemSize, magnification }) => {
  const ref = useRef(null);
  
  let scale = 1;
  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    // Center of the item
    const itemCenterX = rect.left + rect.width / 2;
    // Distance from mouse to center
    const distance = Math.abs(mouseX - itemCenterX);
    
    // We only scale items within 150px of the mouse
    const maxDistance = 150;
    if (distance < maxDistance) {
      // Scale is 1 at maxDistance, and (magnification/baseItemSize) at distance 0
      const maxScale = magnification / baseItemSize;
      const scaleAmount = 1 + (1 - distance / maxDistance) * (maxScale - 1);
      scale = scaleAmount;
    }
  }

  const size = baseItemSize * scale;

  return (
    <div className="dock-item-wrapper" style={{ width: baseItemSize }}>
      <div 
        ref={ref}
        className="dock-item"
        onClick={item.onClick}
        style={{
          width: size,
          height: size
        }}
      >
        <div className="dock-item-content">
          {item.icon}
        </div>
        <div className="dock-tooltip">{item.label}</div>
      </div>
    </div>
  );
};

export default Dock;
