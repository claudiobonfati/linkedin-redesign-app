import React from 'react';
import Image from 'next/image';
import { TweenMax, Power3 } from 'gsap';
import styles from './NotificationsMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { HeaderStateContext } from '../../context/Header';

class NotificationsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'notifications',
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.activateTab = this.activateTab.bind(this);
  }

  static contextType = HeaderStateContext;

  onClickButton() {
    if (this.context.data.tab === 'notifications') {
      this.context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      this.context.dispatch({
        type: 'SET_TAB',
        payload: 'notifications'
      });
    }
  }

  componentDidUpdate() {
    if (this.context.data.tab === 'notifications') {
      this.showDrop();
    } else {
      this.hideDrop();
    }
  }

  showDrop() {
    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 1,
        display: 'block',
        scale: 1,
      },
      ease: Power3.inOut,
    });
  }

  hideDrop() {
    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.inOut,
    });
  }

  activateTab(tab) {
    this.setState({
      currentTab: tab,
    });
  }

  render() {
    return (
      <div className={`ml-3 ${styles.wrapper}`}>
        <button
          aria-expanded="false"
          className={`${styles.navBarButtons} ${this.context.data.tab === 'notifications' ? styles.buttonActive : ''}`}
          type="button"
          onClick={this.onClickButton}
        >
          <span className="lnr lnr-flag" />
        </button>
        <div className={styles.wrapperDrop} ref={(ref) => { this.dropRef = ref; }}>
          <nav className={styles.dropHeader}>
            <ul>
              <li className={this.state.currentTab === 'notifications' ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab('notifications')}>
                  Notifications
                </button>
              </li>
              <li className={this.state.currentTab === 'requests' ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab('requests')}>
                  Requests
                </button>
              </li>
            </ul>
          </nav>
          <div className={`${styles.dropContentOuter} ${this.state.currentTab === 'notifications' ? styles.tabNotifications : styles.tabRequests}`}>
            <div className={styles.dropContentInner}>
              <div className={`px-4 ${styles.dropContent}`}>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <span className="d-block mb-3">
                    7 people viewed you profile
                  </span>
                  <div className={styles.listProfilePics}>
                    {[...Array(4)].map((item, index) => (
                      <div className="mr-2" key={index}>
                        <Image
                          src="https://i.pravatar.cc/300"
                          alt="Profile picture"
                          className={`circle-image ${styles.profilePic}`}
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                    <div className={`mr-2 small ${styles.profilePic}`}>
                      <span>+3</span>
                    </div>
                  </div>
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Jenson Kent"
                    subtitle="published an article: 'What to do for'"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Emily Kilimanjaro"
                    subtitle="is now a connection"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Daniel Estienne"
                    subtitle="is now a connection"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Daniel Estienne"
                    subtitle="is now a connection"
                  />
                </div>
              </div>
              <div className={`px-4 ${styles.dropContent}`}>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Jenson Kent"
                    subtitle="published an article: 'What to do for'"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Emily Kilimanjaro"
                    subtitle="is now a connection"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Daniel Estienne"
                    subtitle="is now a connection"
                  />
                </div>
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <ProfileDisplay
                    image="/images/me.jpg"
                    imageSize={50}
                    title="Daniel Estienne"
                    subtitle="is now a connection"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationsMenu;
