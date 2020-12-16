import React from 'react';
import styles from './Tab.module.sass';

class MenuCompany extends React.Component {
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
              Home
            </a>
          </li>
          <li>
            <a href="https://google.com">
              Carrers
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MenuCompany;
