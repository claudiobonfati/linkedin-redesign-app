import React, { Fragment, useEffect, useRef } from 'react';
import { Image } from 'react-image-and-background-image-fade';
import TextareaAutosize from 'react-textarea-autosize';
import ProfileDisplay from '../ProfileDisplay';
import styles from './BarChat.module.sass';
import { useChat } from '../../context/Chat';
import { useChatConversation } from '../../graphql/hooks';

const barChat = () => {
  const context = useChat();
  console.log('context', context);
  const conversation = useChatConversation(1, context.data.contact.User.id);
  const currentUser = JSON.parse(localStorage.getItem('current-user-preview'));

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileHeaderUser}>
          <button
            className={styles.backButton}
            type="button"
            onClick={() => context.dispatch({ type: 'SET_PAGE', payload: 'Contacts' })}
          >
            <span className="lnr lnr-chevron-left" />
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
          <span className="lnr lnr-frame-expand" />
        </button>
      </div>
      <div className={styles.conversationWrapper}>
        <div>
          <div className={styles.timeBreaker}>
            <span className={styles.timeTag}>
              {context.data.contact.User.lastOnline}
            </span>
          </div>
          {(conversation
          && conversation.data
          && !conversation.error
          && !conversation.loading
          && conversation.data[0].interactions
          && conversation.data[0].interactions.length > 0)
          && (
            <>
              {conversation.data[0].interactions.map((item) => (
                <>
                  <div
                    className={`
                      ${styles.interaction} 
                      ${item.from === 'target' ? styles.fromOther : styles.fromMe}
                    `}
                  >
                    <div className={styles.userPhoto}>
                      {(item.from === 'target')
                      && (
                        <Image
                          src={context.data.contact.User.photo}
                          alt={context.data.contact.User.name}
                        />
                      )}
                      {(item.from === 'me')
                      && (
                        <Image
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
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.actionsWrapper}>
          <TextareaAutosize
            className={styles.messageTextarea}
            minRows={1}
            maxRows={15}
            placeholder="Write a message"
          />
          <button className={styles.sendButton} type="submit">
            <span className="lnr lnr-location" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default barChat;
