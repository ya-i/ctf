import { useState } from 'react';

import { Button } from './Button.tsx';

import './Popup.css';

export function Popup() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="popup">
      <h1>Popup {counter}</h1>

      <p>
        <Button onClick={() => setCounter(counter + 1)} /> the button to hide
        the content.
      </p>
    </div>
  );
}
