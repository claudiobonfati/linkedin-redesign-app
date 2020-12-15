import React from 'react';
// import { TweenMax, Power3 } from 'gsap';
import styles from './Tab.module.sass';
import MenuFeed from './MenuFeed';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // TweenMax.from(this.headerRef, 0.5, { css: { opacity: 0 }, ease: Power3.easeOut, delay: 0.2 });
  }

  render() {
    return (
      <header className={styles.wrapper} ref={(ref) => { this.headerRef = ref; }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <MenuFeed />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Tab;
