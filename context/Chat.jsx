import React, { useReducer, useContext, createContext } from 'react';

export const ChatContext = createContext();

const initialValue = {
  page: 'Contacts',
  contact: null,
  fullScreen: false,
};

const reducer = (state, action) => {
  const allowedPages = ['Contacts', 'Chat', 'Description'];

  switch (action.type) {
    case 'TOGGLE_FULLSCREEN':
      return {
        ...state,
        fullScreen: !state.fullScreen,
      };
    case 'SET_PAGE':
      if (allowedPages.includes(action.payload)) {
        return {
          ...state,
          page: action.payload,
        };
      }
      return { ...state };
    case 'SET_CONTACT':
      return {
        ...state,
        contact: action.payload,
        page: 'Chat',
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
