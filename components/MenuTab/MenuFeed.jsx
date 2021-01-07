import React from 'react';
import styles from './Tab.module.sass';

class MenuFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className={styles.menu}>
        <li>
          <a href="https://google.com" className={styles.active}>
            Posts
          </a>
        </li>
        <li>
          <a href="https://google.com">
            Articles
          </a>
        </li>
        <li>
          <a href="https://google.com">
            Companies
          </a>
        </li>
        <li>
          <a href="https://google.com">
            Jobs
          </a>
        </li>
      </ul>
    );
  }
}

export default MenuFeed;
