import React, { Fragment, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import FeatherIcon from 'feather-icons-react';
import ProfileDisplay from '../ProfileDisplay';
import styles from './BarChat.module.sass';
import { useChat } from '../../context/Chat';

const barChat = () => {
  const context = useChat();
  const currentUser = JSON.parse(localStorage.getItem('current-user-preview'));
  const [field, setField] = useState('');

  const sendMessage = () => {
    const cleanedField = field.replace(/(\r\n|\n|\r)/gm, '');
    if (cleanedField === '') {
      return;
    }

    const message = {
      id: Math.random().toString(36).substr(2, 9), // Random unique key
      from: 'me',
      content: field,
    };

    context.dispatch({
      type: 'SEND_MESSAGE',
      payload: message,
    });

    setField('');
  };

  const handleChangeInput = ({ target }) => {
    const cleanedField = target.value.replace(/(\r\n|\n|\r)/gm, '');

    if (cleanedField === '') {
      setField('');
    } else {
      setField(target.value);
    }
  };

  const handleKeyDownInput = (e) => {
    if ((e.ctrlKey || e.shiftKey || e.code === 'MetaLeft' || e.code === 'MetaRight')
        && [10, 13].includes(e.keyCode)) {
      sendMessage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileHeaderUser}>
          <button
            className={styles.backButton}
            type="button"
            onClick={() => context.dispatch({ type: 'SET_PAGE', payload: 'Contacts' })}
          >
            <FeatherIcon icon="chevron-left" size="20" strokeWidth="1.2" />
          </button>
          <button
            className={styles.profileButton}
            type="button"
            onClick={() => context.dispatch({ type: 'SET_PAGE', payload: 'Description' })}
          >
            <ProfileDisplay
              image={context.data.contact.User.photo}
              imageSize={30}
              title={context.data.contact.User.name}
              imagePadding="2"
            />
          </button>
        </div>
        <button
          className={styles.buttonFullScreen}
          type="button"
          onClick={() => context.dispatch({ type: 'TOGGLE_FULLSCREEN' })}
        >
          {!context.data.fullScreen ? (
            <FeatherIcon icon="maximize" size="20" strokeWidth="1.2" />
          ) : (
            <FeatherIcon icon="minimize" size="20" strokeWidth="1.2" />
          )}
        </button>
      </div>
      <div className={styles.conversationWrapper}>
        <div>
          <div className={styles.timeBreaker}>
            <span className={styles.timeTag}>
              {context.data.contact.User.lastOnline}
            </span>
          </div>
          {(context.data.dialogue
          && context.data.dialogue.length > 0)
          && (
            <>
              {context.data.dialogue.map((item) => (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  className={`
                    ${styles.interaction} 
                    ${item.from === 'target' ? styles.fromOther : styles.fromMe}
                  `}
                  key={item.id}
                >
                  <div className={styles.userPhoto}>
                    {(item.from === 'target') && (
                      <img
                        src={context.data.contact.User.photo}
                        alt={context.data.contact.User.name}
                      />
                    )}
                    {(item.from === 'me') && (
                      <img
                        src={currentUser.data.photo}
                        alt={currentUser.data.name}
                      />
                    )}
                  </div>
                  <div className={styles.baloom}>
                    <div className={styles.baloomInner}>
                      <span className={styles.tailOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13">
                          <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                        </svg>
                      </span>
                      <p>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.actionsWrapper}>
          <TextareaAutosize
            className={styles.messageTextarea}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDownInput}
            minRows={1}
            maxRows={5}
            placeholder="Write a message"
            value={field}
          />
          <button
            className={styles.sendButton}
            type="submit"
            onClick={sendMessage}
          >
            <FeatherIcon icon="send" size="20" strokeWidth="1.2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default barChat;
