import React from 'react';
import Image from 'next/image';
import styles from './Header.module.sass';
import Search from './Search';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="container">
        <div className="row justtyfy-content-between py-4">
          <div className="col-md-3 col-6 d-flex">
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
              <button type="button" className={`${styles.buttonSelect}`}>
                Discover
                <span className="lnr lnr-chevron-down" />
              </button>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <Search />
          </div>
          <div className="col-md-3 col-6 d-flex justify-content-end">
            <button
              aria-expanded="false"
              data-control-name="nav.settings"
              className={`${styles.navBarButtons}`}
              type="button"
              tabIndex="0"
            >
              <span className="lnr lnr-bubble" />
            </button>
            <button
              aria-expanded="false"
              data-control-name="nav.settings"
              className={`ml-2 ${styles.navBarButtons}`}
              type="button"
              tabIndex="0"
            >
              <span className="lnr lnr-flag" />
            </button>
            <button
              aria-expanded="false"
              data-control-name="nav.settings"
              className={`ml-2 ${styles.navBarButtons}`}
              type="button"
              tabIndex="0"
            >
              <Image
                src="/images/me.jpg"
                alt="Profile picture"
                className={`circle-image ${styles.profilePic}`}
                width={500}
                height={500}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
