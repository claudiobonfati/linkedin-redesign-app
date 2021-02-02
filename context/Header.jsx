import React, { useReducer, useContext, createContext } from 'react';

export const HeaderStateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLOSE_TAB':
      return { ...state, tab: null };
    case 'SET_TAB':
      return { ...state, tab: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { tab: null });

  return (
    <HeaderStateContext.Provider value={{ data: state, dispatch }}>
      {children}
    </HeaderStateContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderStateContext);
