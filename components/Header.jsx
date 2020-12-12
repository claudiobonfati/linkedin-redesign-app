import React from 'react';
import Image from 'next/image';
import { TweenMax, Power3 } from 'gsap';
import styles from './Header.module.sass';
import Search from './Search';
import DiscoverMenu from './DiscoverMenu';
import NotificationsButton from './NotificationsButton';
import MessagesButton from './MessagesButton';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setActiveDrop = this.setActiveDrop.bind(this);
  }

  componentDidMount() {
    TweenMax.from(this.headerRef, 0.5, { css: { opacity: 0 }, ease: Power3.easeOut, delay: 0.2 });
  }

  setActiveDrop(target) {
    if (target === 'messages') {
      this.NotificationsButtonRef.hideDrop();
      this.DiscoverMenuRef.hideDrop();
    } else if (target === 'notifications') {
      this.MessagesButtonRef.hideDrop();
      this.DiscoverMenuRef.hideDrop();
    } else if (target === 'discover') {
      this.NotificationsButtonRef.hideDrop();
      this.MessagesButtonRef.hideDrop();
    }
  }

  render() {
    return (
      <header className={`position-relative ${styles.wrapper}`} ref={(ref) => { this.headerRef = ref; }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-6 d-flex py-4 position-static">
              <div className="align-self-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.4 504" className={`${styles.logo}`}>
                  <g id="linkedin" transform="translate(0 -0.2)">
                    <g>
                      <path data-name="Path 1" d="M377.6.2H126.4C56.8.2,0,57,0,126.6V378.2c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6C504,57,447.2.2,377.6.2ZM168,408.2H96v-208h72Zm-36.4-240a36.8,36.8,0,1,1,36.8-36.8C168,151.8,151.6,168.2,131.6,168.2Zm276.8,240H348V307.4c0-24.4-3.2-55.6-36.4-55.6-34,0-39.6,26.4-39.6,54V408.2H212v-208h56v28h1.6c8.8-16,29.2-28.4,61.2-28.4,66,0,77.6,38,77.6,94.4v114Z" fill="#007fb2" />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="border-left-gray align-self-center ml-4 pl-4">
                <DiscoverMenu
                  setActiveDrop={this.setActiveDrop}
                  ref={(ref) => { this.DiscoverMenuRef = ref; }}
                />
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block py-4">
              <Search />
            </div>
            <div className="col-md-3 col-6 d-flex justify-content-end position-relative py-4">
              <MessagesButton
                setActiveDrop={this.setActiveDrop}
                ref={(ref) => { this.MessagesButtonRef = ref; }}
              />
              <NotificationsButton
                setActiveDrop={this.setActiveDrop}
                ref={(ref) => { this.NotificationsButtonRef = ref; }}
              />
              <button
                aria-expanded="false"
                className={`ml-3 ${styles.navBarButtons}`}
                type="button"
              >
                <Image
                  src="/images/me.jpg"
                  alt="Profile picture"
                  className={`circle-image ${styles.profilePic}`}
                  width={35}
                  height={35}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
