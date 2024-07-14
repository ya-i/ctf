import { hydrateRoot } from 'react-dom/client';

import { Popup } from './popup/Popup.tsx';

hydrateRoot(document.getElementById('react-root')!, <Popup />);
