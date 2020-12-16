import React from 'react';
import styles from './Tab.module.sass';

class MenuAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <nav>
        <ul className={styles.menu}>
          <li>
            <a href="https://google.com" className={styles.active}>
              Details
            </a>
          </li>
          <li>
            <a href="https://google.com">
              Posts
            </a>
          </li>
          <li>
            <a href="https://google.com">
              Contacts
            </a>
          </li>
          <li>
            <a href="https://google.com">
              Improve
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MenuAccount;
