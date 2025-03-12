import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Kada se promeni ruta, skroluj na vrh stranice
    window.scrollTo(0, 0);
    
    // Ako postoji hash (npr. #faq), skroluj do tog elementa nakon kratke pauze
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null; // Ova komponenta ne renderuje ništa
}

export default ScrollToTop; 