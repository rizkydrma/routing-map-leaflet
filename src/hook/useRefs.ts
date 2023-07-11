import { useRef } from 'react';

const useRefs = () => {
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    refs.current[key] = element;
  };

  return { refs: refs.current, setRefFromKey };
};

export default useRefs;
