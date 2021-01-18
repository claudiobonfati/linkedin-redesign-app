import React from 'react';
import { withRouter } from 'next/router';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

class MenuAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.router.query.username,
    };
  }

  render() {
    return (
      <ul className={styles.menu}>
        <li>
          <ActiveLink href={`/profile/${this.state.username}/details`} activeClassName={styles.active}>
            <a>Details</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href={`/profile/${this.state.username}/posts`} activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </li>
      </ul>
    );
  }
}

export default withRouter(MenuAccount);
