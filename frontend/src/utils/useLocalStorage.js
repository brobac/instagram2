//https://usehooks.com/useLocalStorage/
import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}

export function setStorageItem(key, value) {
  //setStorageItem은 값을 저장만하면 됨
  try {
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    // Save state 상태값을 반영
    setStoredValue(valueToStore);

    //로컬스토리지에 반영하는 로직
    setStorageItem(key, valueToStore);
    try {
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
