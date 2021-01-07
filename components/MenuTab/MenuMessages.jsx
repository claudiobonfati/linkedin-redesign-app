import React from 'react';
import styles from './Tab.module.sass';

class MenuMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className={styles.menu}>
        <li>
          <a href="https://google.com" className={styles.active}>
            All messages
          </a>
        </li>
        <li>
          <a href="https://google.com">
            Unread
          </a>
        </li>
        <li>
          <a href="https://google.com">
            InMail
          </a>
        </li>
      </ul>
    );
  }
}

export default MenuMessages;
