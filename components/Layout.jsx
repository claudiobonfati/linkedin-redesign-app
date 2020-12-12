import React from 'react';
import { TweenMax } from 'gsap';
import Header from './Header';
import styles from './Layout.module.sass';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    TweenMax.to(this.appRef, 0, { css: { visibility: 'visible' } });
  }

  render() {
    return (
      <div className={styles.layoutWrapper} ref={(ref) => { this.appRef = ref; }}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
