import React from 'react';
import { Image } from 'react-image-and-background-image-fade';
import Link from 'next/link';
import FeatherIcon from 'feather-icons-react';
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
          <FeatherIcon icon="x" size="20" strokeWidth="1.2" />
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
          <a href={`mailto:${context.data.contact.User.email}`} className={styles.item}>
            <FeatherIcon icon="globe" size="16" strokeWidth="1" fill />
            {context.data.contact.User.email}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.item}>
            <FeatherIcon icon="twitter" size="16" strokeWidth="1" fill />
            {context.data.contact.User.twitter}
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.item}>
            <FeatherIcon icon="facebook" size="16" strokeWidth="1" fill />
            {context.data.contact.User.skype}
          </a>
        </div>
      </div>
    </div>
  );
};

export default barDescription;
