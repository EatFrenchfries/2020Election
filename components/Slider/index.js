import React, { useRef, useState } from "react";

const Slider = ({ children }) => {
  const ourRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const handleDragStart = (e) => {
    if (!ourRef.current) return;
    const slider = ourRef.current.children[0];
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
  };
  const handleDragEnd = () => {
    setIsMouseDown(false);
  };
  const handleDrag = (e) => {
    if (!isMouseDown || !ourRef.current) return;
    e.preventDefault();
    const slider = ourRef.current.children[0];
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.2;
    const walkY = (y - mouseCoords.current.startY) * 1.2;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;
  };
  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      onMouseLeave={handleDragEnd}
    >
      {children}
    </div>
  );
};

export default Slider;
