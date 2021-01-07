import React from 'react';
import { TimelineMax, Power3 } from 'gsap';
import Link from 'next/link';
import styles from './DiscoverMenu.module.sass';
import Search from './Search';

class DiscoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    this.tlShowMenu = new TimelineMax({ paused: true });
    this.tlShowMenu
      .from(this.dropRef, 0.5, {
        css: {
          display: 'none',
          height: 0,
        },
      })
      .from(this.dropContentRef, 0.5, {
        css: {
          opacity: 0,
          transform: 'translateY(-20px)',
        },
        ease: Power3.easeOut,
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
        this.props.setActiveDrop('discover');
        setTimeout(() => {
          this.toggleVisibility();
        }, 200);
      }
    });
  }

  toggleVisibility() {
    if (this.state.isVisible) {
      this.tlShowMenu.play();
    } else {
      this.tlShowMenu.reverse();
    }
  }

  showDrop() {
    this.setState({
      isVisible: true,
    });

    this.tlShowMenu.play();
  }

  hideDrop() {
    this.setState({
      isVisible: false,
    });

    this.tlShowMenu.reverse();
  }

  render() {
    return (
      <div className={`${styles.wrapper}`}>
        <button
          aria-expanded="false"
          className={`${styles.buttonSelect} ${this.state.isVisible ? styles.buttonActive : ''}`}
          type="button"
          onClick={this.onClickButton}
        >
          Discover
          <span className="lnr lnr-chevron-down" />
        </button>
        <div className={styles.wrapperDrop} ref={(ref) => { this.dropRef = ref; }}>
          <div className="container py-2 py-sm-5">
            <div className="row justify-content-center" ref={(ref) => { this.dropContentRef = ref; }}>
              <div className="col-12 d-block d-md-none pt-3 pb-2">
                <Search quickSearch={false} />
              </div>
              <div className="col-lg-2 col-md-3 d-none d-md-block pl-0 align-self-center">
                <nav className={`border-right-gray ${styles.menuNav} ${styles.spaced}`}>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="https://google.com">Messages</a></li>
                    <li><a href="https://google.com">Calendar</a></li>
                    <li><a href="https://google.com">Requests</a></li>
                    <li><a href="https://google.com">Wiki</a></li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 col-sm-3 col-12 py-3">
                <h6>
                  Profile
                </h6>
                <nav className={styles.menuNav}>
                  <ul>
                    <li><Link href="/me/details">Home</Link></li>
                    <li><a href="https://google.com">Messages</a></li>
                    <li><a href="https://google.com">Calendar</a></li>
                    <li><a href="https://google.com">Requests</a></li>
                    <li><a href="https://google.com">Wiki</a></li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 col-sm-3 col-12 py-3">
                <h6>
                  My network
                </h6>
                <nav className={styles.menuNav}>
                  <ul>
                    <li><a href="https://google.com">Connections</a></li>
                    <li><a href="https://google.com">Add contacts</a></li>
                    <li><a href="https://google.com">Alumnis</a></li>
                    <li><a href="https://google.com">People you know</a></li>
                    <li><a href="https://google.com">Statics</a></li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 col-sm-3 col-12 py-3">
                <h6>
                  Interests
                </h6>
                <nav className={styles.menuNav}>
                  <ul>
                    <li><a href="https://google.com">Companies</a></li>
                    <li><a href="https://google.com">Groups</a></li>
                    <li><a href="https://google.com">Slideshare</a></li>
                    <li><a href="https://google.com">Learning</a></li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-2 col-sm-3 col-12 py-3">
                <h6>
                  Wiki
                </h6>
                <nav className={styles.menuNav}>
                  <ul>
                    <li><a href="https://google.com">Our partners</a></li>
                    <li><a href="https://google.com">Top clients</a></li>
                    <li><a href="https://google.com">Manifesto</a></li>
                    <li><a href="https://google.com">Pitching</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverMenu;
