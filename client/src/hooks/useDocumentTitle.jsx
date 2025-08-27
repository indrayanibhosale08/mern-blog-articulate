import { useEffect } from 'react';

const DEFAULT_TITLE = 'Articulate';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : `${DEFAULT_TITLE} | Where Ideas Find Their Voice`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};