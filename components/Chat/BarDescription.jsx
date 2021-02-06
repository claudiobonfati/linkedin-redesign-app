import React from 'react';
import { Image } from 'react-image-and-background-image-fade';
import Link from 'next/link';
import styles from './BarDescription.module.sass';
import { useChat } from '../../context/Chat';

const barDescription = () => {
  const context = useChat();

  return (
    <div
      className={`
        ${styles.wrapper}
        ${context.data.fullScreen ? styles.fullScreen : ''} 
      `}
    >
      <div className={styles.mobileHeader}>
        <button
          className={styles.buttonClose}
          type="button"
          onClick={() => context.dispatch({ type: 'SET_PAGE', payload: 'Chat' })}
        >
          <span className="lnr lnr-cross" />
        </button>
      </div>
      <div className={styles.content}>
        <Link href={`/profile/${context.data.contact.User.username}/details`}>
          <a className="cursor-pointer">
            <div className={styles.userPhoto}>
              <Image
                src={context.data.contact.User.photo}
                alt={context.data.contact.User.name}
              />
            </div>
          </a>
        </Link>
        <Link href={`/profile/${context.data.contact.User.username}/details`}>
          <a className={styles.userName}>
            {context.data.contact.User.name}
          </a>
        </Link>
        <div className={styles.userSubtitle}>
          {`Active ${context.data.contact.User.lastOnline}`}
        </div>
        <div className={styles.socialNetworks}>
          <a href="https://google.com" className={styles.item}>
            <span className="lnr lnr-earth" />
            {context.data.contact.User.email}
          </a>
          <a href="https://google.com" className={styles.item}>
            <span className="lnr lnr-earth" />
            {context.data.contact.User.twitter}
          </a>
          <a href="https://google.com" className={styles.item}>
            <span className="lnr lnr-earth" />
            {context.data.contact.User.skype}
          </a>
        </div>
      </div>
    </div>
  );
};

export default barDescription;
