import React from 'react';
import ActiveLink from '../../utils/ActiveLink';
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
          <ActiveLink href="/me/details" activeClassName={styles.active}>
            <a>Details</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/me/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </li>
        <li>
          <a href="https://google.com">
            Contacts
          </a>
        </li>
        <li>
          <ActiveLink href="/me/improve" activeClassName={styles.active}>
            <a>Improve</a>
          </ActiveLink>
        </li>
      </ul>
    );
  }
}

export default MenuFeed;
