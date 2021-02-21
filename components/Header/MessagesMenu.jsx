import React, { useEffect, useRef, useState } from 'react';
import { TweenMax, Power3 } from 'gsap';
import Link from 'next/link';
import styles from './MessagesMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { useHeader } from '../../context/Header';
import { useNotificationMessages } from '../../graphql/hooks';

const messagesButton = () => {
  const context = useHeader();
  const [alert, setAlert] = useState(true);
  const messages = useNotificationMessages(0, 10);
  let dropRef = useRef(null);

  const onClickButton = () => {
    if (context.data.tab === 'messages') {
      context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      context.dispatch({
        type: 'SET_TAB',
        payload: 'messages',
      });

      setAlert(false);
    }
  };

  const showDrop = () => {
    TweenMax.to(dropRef, 0.2, {
      css: {
        opacity: 1,
        display: 'block',
        scale: 1,
      },
      ease: Power3.easeOut,
    });
  };

  const hideDrop = () => {
    TweenMax.to(dropRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.easeOut,
    });
  };

  useEffect(() => {
    if (context.data.tab === 'messages') {
      showDrop();
    } else {
      hideDrop();
    }
  }, [context]);

  return (
    <div className={`ml-3 ${styles.wrapper}`}>
      <button
        aria-expanded="false"
        className={`
          ${styles.navBarButtons} 
          ${context.data.tab === 'messages' ? styles.buttonActive : ''}
          ${alert ? styles.alertIcon : ''}
        `}
        type="button"
        onClick={onClickButton}
      >
        <span className="lnr lnr-bubble" />
      </button>
      <div className={styles.wrapperDrop} ref={(ref) => { dropRef = ref; }}>
        <div className={styles.dropHeader}>
          <div className={styles.dropHeaderTitle}>
            Messages
          </div>
          <div className={styles.dropHeaderButton}>
            <Link href="/messages/all" scroll={false}>
              <a title="New message">
                <span className="lnr lnr-cross" />
              </a>
            </Link>
          </div>
        </div>
        {(messages.data
        && messages.data.length > 0)
        && (
          <div className="px-4">
            {messages.data.map((item) => (
              <div className={`py-4 ${styles.dropContentItem}`}>
                <Link href="/messages/all" scroll={false}>
                  <a title="Open messages">
                    <ProfileDisplay
                      image={item.User.photo}
                      imageSize={50}
                      title={item.User.name}
                      subtitle={item.message}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default messagesButton;
