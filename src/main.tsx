import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import logoImg from './assets/images/logo.png';

// Ensure the logo and favorite icon are strictly identical across all devices and GitHub Pages deployments
(function syncFaviconWithLogo() {
  if (typeof document !== 'undefined') {
    try {
      const rels = ['icon', 'shortcut icon', 'apple-touch-icon', 'apple-touch-icon-precomposed'];
      rels.forEach(rel => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = logoImg;
      });
    } catch {
      // Graceful fallback
    }
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

