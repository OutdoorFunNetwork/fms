import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Fun Management System`;
  }, [title]);
};

export default useTitle;
