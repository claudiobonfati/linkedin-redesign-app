import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import styles from './MessagesMenu.module.sass';
import ProfileDisplay from './ProfileDisplay';

class MessagesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
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
        this.props.setActiveDrop('messages');
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
  }

  showDrop() {
    this.setState({
      isVisible: true,
    });

    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 1, display: 'block', scale: 1,
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
        opacity: 0, display: 'none', scale: 0.95,
      },
      ease: Power3.easeOut,
    });
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
          <span className="lnr lnr-bubble" />
        </button>
        <div className={styles.wrapperDrop} ref={(ref) => { this.dropRef = ref; }}>
          <div className={styles.dropHeader}>
            <div className={styles.dropHeaderTitle}>
              Messages
            </div>
            <div className={styles.dropHeaderButton}>
              <button type="button" onClick={() => this.activateTab(0)}>
                <span className="lnr lnr-plus-circle" />
              </button>
            </div>
          </div>
          <div className="content px-4">
            <div className={styles.dropContentItem}>
              <ProfileDisplay
                imgSize={50}
                title="Robert Tayler"
                subtitle="Hi Claudio, would you mind sharing"
              />
            </div>
            <div className={styles.dropContentItem}>
              <ProfileDisplay
                imgSize={50}
                title="James Daniel"
                subtitle="Im available now if its convenient?"
              />
            </div>
            <div className={styles.dropContentItem}>
              <ProfileDisplay
                imgSize={50}
                title="Jenny Gossuin"
                subtitle="Im waiting for your Floor 6"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessagesButton;
