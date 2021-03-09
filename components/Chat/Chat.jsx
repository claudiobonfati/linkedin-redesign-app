import React from 'react';
import PropTypes from 'prop-types';
import styles from './Chat.module.sass';
import BarContacts from './BarContacts';
import BarDescription from './BarDescription';
import BarChat from './BarChat';
import { useChat } from '../../context/Chat';

const myChat = (props) => {
  const context = useChat();

  return (
    <div
      className={`
        ${styles.wrapper} 
        ${context.data.fullScreen ? styles.fullScreen : ''} 
        ${!context.data.contact ? styles.noUser : ''} 
        ${styles[`Page${context.data.page}`]}
      `}
    >
      <span className={styles.imagePlaceholder} style={{backgroundImage: `url(${process.env.BASE_PATH}/images/chat.svg)`}}/>
      <div className={styles.sideBarLeft}>
        <BarContacts contacts={props.contacts} />
      </div>
      <div className={styles.center}>
        {context.data.contact && (
          <BarChat />
        )}
      </div>
      <div className={styles.sideBarRight}>
        {context.data.contact && (
          <BarDescription />
        )}
      </div>
    </div>
  );
};

myChat.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default myChat;
