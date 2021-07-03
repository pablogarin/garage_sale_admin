import { createContext } from 'react';

const defaultValue = {
  userToken: null,
  setUserToken: () => null
}

export default createContext(defaultValue);
