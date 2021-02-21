import React, { useEffect, useRef, useState } from 'react';
import { TweenMax, Power3 } from 'gsap';
import styles from './MessagesMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { useHeader } from '../../context/Header';

const messagesButton = () => {
  const context = useHeader();
  let dropRef = useRef(null);
  const [alert, setAlert] = useState(true);

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
            <button type="button" onClick={onClickButton}>
              <span className="lnr lnr-cross" />
            </button>
          </div>
        </div>
        <div className="px-4">
          <div className={`py-4 ${styles.dropContentItem}`}>
            <ProfileDisplay
              image="/images/me.jpg"
              imageSize={50}
              title="Robert Tayler"
              subtitle="Hi Claudio, would you mind sharing"
            />
          </div>
          <div className={`py-4 ${styles.dropContentItem}`}>
            <ProfileDisplay
              image="/images/me.jpg"
              imageSize={50}
              title="James Daniel"
              subtitle="Im available now if its convenient?"
            />
          </div>
          <div className={`py-4 ${styles.dropContentItem}`}>
            <ProfileDisplay
              image="/images/me.jpg"
              imageSize={50}
              title="Jenny Gossuin"
              subtitle="Im waiting for your Floor 6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default messagesButton;
