import { useState, useEffect } from "react";

/** useLocalStorage hook to manage values in localStorage */
function useLocalStorage(key, defaultValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
