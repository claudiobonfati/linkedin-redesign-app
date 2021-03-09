import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import { Router, withRouter } from 'next/router';
import styles from './Tab.module.sass';
import MenuSearch from './MenuSearch';
import MenuFeed from './MenuFeed';
import MenuMyProfile from './MenuMyProfile';
import MenuAccount from './MenuAccount';
import MenuCompany from './MenuCompany';
import MenuMessages from './MenuMessages';
import nthIndex from '../../utils/nthIndex';

class Tab extends React.Component {
  // Find correct tab menu to display based on pathname
  static findMenuName(url) {
    const path = url.replace(process.env.BASE_PATH, '');
    const pathName = path.substring(0, nthIndex(path, '/', 2));
    let menu;

    switch (pathName) {
      case '/':
      case '/articles':
      case '/companies':
      case '/jobs':
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
      case '/messages':
        menu = 'messages';
        break;
      case '/search':
        menu = 'search';
        break;
      default:
        menu = 'feed';
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
      messages: MenuMessages,
      search: MenuSearch,
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
      transform: 'translateY(-20px)',
      ease: Power3.easeOut,
      delay: 0.6,
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
