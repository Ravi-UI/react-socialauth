import React from 'react';

import './scrollDown.css';

function scrollDownLogic(nextSectionId) {
  document.getElementById(nextSectionId).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
}

export default function buttonSkeleton(id, customStyles) {
  return (
    <div id="scroll-down-btn" onClick={() => scrollDownLogic(id)} style={customStyles}>
      <div id="scroll-down-btn__mouse-icon">
        <div id="mouse-icon__mouse-middle-btn"></div>
      </div>
      <div id="scroll-down-btn__text">Scroll</div>
    </div>
  )
}