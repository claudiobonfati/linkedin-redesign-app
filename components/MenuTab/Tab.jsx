import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import { Router, withRouter } from 'next/router';
import styles from './Tab.module.sass';
import MenuFeed from './MenuFeed';
import MenuMyProfile from './MenuMyProfile';
import MenuAccount from './MenuAccount';
import MenuCompany from './MenuCompany';
import nthIndex from '../../utils/nthIndex';

class Tab extends React.Component {
  // Find correct tab menu to display based on pathname
  static findMenuName(url) {
    const pathName = url.substring(0, nthIndex(url, '/', 2));
    let menu;

    switch (pathName) {
      case '/feed':
        menu = 'feed';
        break;
      case '/me':
        menu = 'myProfile';
        break;
      case '/profile':
        menu = 'account';
        break;
      case '/company':
        menu = 'company';
        break;
      default:
        menu = 'feed'; // FIX this
        break;
    }

    return menu;
  }

  constructor(props) {
    super(props);
    this.state = {
      menuName: Tab.findMenuName(this.props.router.pathname),
    };

    this.menus = {
      feed: MenuFeed,
      myProfile: MenuMyProfile,
      account: MenuAccount,
      company: MenuCompany,
    };

    this.updateMenu = this.updateMenu.bind(this);
    this.findMenuMane = this.updateMenu.bind(this);

    Router.events.on('routeChangeComplete', (url) => {
      this.updateMenu(Tab.findMenuName(url));
    });
  }

  componentDidMount() {
    TweenMax.from(this.tabRef, 0.5, {
      opacity: 0,
      transform: 'translateY(-30px)',
      ease: Power3.easeOut,
      delay: 0.8,
    });
  }

  updateMenu(target) {
    if (target !== this.state.menuName) {
      TweenMax.to(this.menuWrapperRef, 0.3, { opacity: 0 });

      setTimeout(() => {
        this.setState({ menuName: target }, () => {
          TweenMax.to(this.menuWrapperRef, 0.3, { opacity: 1 });
        });
      }, 300);
    }
  }

  render() {
    return (
      <nav className={styles.wrapper} ref={(ref) => { this.tabRef = ref; }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12" ref={(ref) => { this.menuWrapperRef = ref; }}>
              {(() => {
                const Menu = this.menus[this.state.menuName];
                return <Menu router={this.props.router} />;
              })()}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Tab);
