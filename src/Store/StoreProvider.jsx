import {
  createContext, useMemo, useReducer,
} from 'react';
import { storeReducer, storeInitialState } from './StoreReducer';

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, storeInitialState);

  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};