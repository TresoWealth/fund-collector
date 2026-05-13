import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const useLocalSave = (methods: UseFormReturn, key: string) => {
  const { watch } = methods;
  const values = watch();

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(k => methods.setValue(k, data[k]));
    }
  }, [methods, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values));
  }, [values, key]);

  const clearSave = () => localStorage.removeItem(key);

  return { clearSave };
};