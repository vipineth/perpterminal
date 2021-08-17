import { useState } from "react";
import useSSR from "use-ssr";

export default function useLocalStorage(key, initialValue) {
  let { isBrowser } = useSSR();
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (isBrowser) {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
