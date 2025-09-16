import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    
    if (title) {
      document.title = `Croak Counter - ${title}`;
    } else {
      document.title = 'Croak Counter';
    }
  }, [title]);
}
