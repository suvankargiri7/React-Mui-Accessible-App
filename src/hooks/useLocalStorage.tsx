import { useState, useEffect } from 'react';

const useLocalStorage = <T extends Object>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.error(`Error reading localStorage key "${key}":`, e);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting localStorage key "${key}":`, e);
    }
  }, [key, value]);
  const clear = () => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
    } catch (e) {
      console.error(`Error clearing localStorage key "${key}":`, e);
    }
  };
  return [value, setValue, clear] as const;
};

export default useLocalStorage;
