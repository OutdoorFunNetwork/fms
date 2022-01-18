import { useRef } from 'react';

const useTitle = (title: string, revert = false) => {
  const defaultTItle = useRef(document.title);

}

export default useTitle;