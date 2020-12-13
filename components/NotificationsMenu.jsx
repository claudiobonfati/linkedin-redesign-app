import React from 'react';
import Image from 'next/image';
import { TimelineMax, TweenMax, Power3 } from 'gsap';
import styles from './NotificationsMenu.module.sass';
import ProfileDisplay from './ProfileDisplay';

class NotificationsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentTab: 0,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.activateTab = this.activateTab.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.tlShowTabNotification = new TimelineMax({ paused: true });
    this.tlShowTabNotification
      .from(this.tabContentNotificationRef, 0.4, {
        css: {
          opacity: 0,
          display: 'none',
          height: 0,
        },
      });

    this.tlShowTabRequest = new TimelineMax({ paused: true });
    this.tlShowTabRequest
      .from(this.tabContentRequestRef, 0.4, {
        css: {
          opacity: 0,
          display: 'none',
          height: 0,
        },
      });

    this.toggleVisibility();
  }

  onClickButton() {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }), () => {
      if (!this.state.isVisible) {
        this.toggleVisibility();
        this.props.setActiveDrop(null);
      } else {
        this.props.setActiveDrop('notifications');
        setTimeout(() => {
          this.toggleVisibility();
        }, 200);
      }
    });
  }

  toggleVisibility() {
    if (this.state.isVisible) {
      this.showDrop();
    } else {
      this.hideDrop();
    }

    this.activateTab(0);
  }

  showDrop() {
    this.setState({
      isVisible: true,
    });

    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 1,
        display: 'block',
        scale: 1,
      },
      ease: Power3.easeOut,
    });
  }

  hideDrop() {
    this.setState({
      isVisible: false,
    });

    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.easeOut,
    });
  }

  activateTab(tab) {
    this.setState({
      currentTab: tab,
    });

    if (tab === 0) {
      this.tlShowTabRequest.reverse();
      setTimeout(() => {
        this.tlShowTabNotification.play();
      }, this.tlShowTabRequest.duration() * 1000);
    } else if (tab === 1) {
      this.tlShowTabNotification.reverse();
      setTimeout(() => {
        this.tlShowTabRequest.play();
      }, this.tlShowTabNotification.duration() * 1000);
    }
  }

  render() {
    return (
      <div className={`ml-3 ${styles.wrapper}`}>
        <button
          aria-expanded="false"
          className={`${styles.navBarButtons} ${this.state.isVisible ? styles.buttonActive : ''}`}
          type="button"
          onClick={this.onClickButton}
        >
          <span className="lnr lnr-flag" />
        </button>
        <div className={styles.wrapperDrop} ref={(ref) => { this.dropRef = ref; }}>
          <nav className={styles.dropHeader}>
            <ul>
              <li className={this.state.currentTab === 0 ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab(0)}>
                  Notifications
                </button>
              </li>
              <li className={this.state.currentTab === 1 ? styles.activeItem : ''}>
                <button type="button" onClick={() => this.activateTab(1)}>
                  Requests
                </button>
              </li>
            </ul>
          </nav>
          <div className="content px-4">
            <div ref={(ref) => { this.tabContentNotificationRef = ref; }} style={{ height: 431 }}>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <span className="d-block mb-3">
                  7 people viewed you profile
                </span>
                <div className={styles.listProfilePics}>
                  {[...Array(4)].map((index) => (
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
                  imgSize={50}
                  title="Jenson Kent"
                  subtitle="published an article: 'What to do for'"
                />
              </div>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Emily Kilimanjaro"
                  subtitle="is now a connection"
                />
              </div>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Daniel Estienne"
                  subtitle="is now a connection"
                />
              </div>
            </div>
            <div ref={(ref) => { this.tabContentRequestRef = ref; }}>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Jenson Kent"
                  subtitle="published an article: 'What to do for'"
                />
              </div>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Emily Kilimanjaro"
                  subtitle="is now a connection"
                />
              </div>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Daniel Estienne"
                  subtitle="is now a connection"
                />
              </div>
              <div className={`py-4 ${styles.dropContentItem}`}>
                <ProfileDisplay
                  imgSize={50}
                  title="Daniel Estienne"
                  subtitle="is now a connection"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationsMenu;
