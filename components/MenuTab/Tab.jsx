import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import styles from './Tab.module.sass';
import MenuFeed from './MenuFeed';
import MenuMyProfile from './MenuMyProfile';
import MenuAccount from './MenuAccount';
import MenuCompany from './MenuCompany';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuName: 'feed',
    };

    this.menus = {
      feed: MenuFeed,
      myProfile: MenuMyProfile,
      account: MenuAccount,
      company: MenuCompany,
    };

    this.setMenu = this.setMenu.bind(this);
  }

  componentDidMount() {
    TweenMax.from(this.tabRef, 0.5, {
      opacity: 0,
      transform: 'translateY(-30px)',
      ease: Power3.easeOut,
      delay: 0.8,
    });

    setTimeout(() => {
      this.setMenu('account');
    }, 5000);
  }

  setMenu(menu) {
    console.log(menu);
    TweenMax.to(this.menuWrapperRef, 0.3, { opacity: 0 });

    setTimeout(() => {
      this.setState({ menuName: menu }, () => {
        TweenMax.to(this.menuWrapperRef, 0.3, { opacity: 1 });
      });
    }, 300);
  }

  render() {
    return (
      <header className={styles.wrapper} ref={(ref) => { this.tabRef = ref; }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12" ref={(ref) => { this.menuWrapperRef = ref; }}>
              {(() => {
                const Menu = this.menus[this.state.menuName];
                return <Menu />;
              })()}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Tab;
