import './scrollUpBtn.css';

import React from 'react';

export default function scrollUpBtn(scrollUp) {
  return (
    <button id="scroll-up-btn" onClick={() => scrollUp()}>&uarr;</button>
  )
}