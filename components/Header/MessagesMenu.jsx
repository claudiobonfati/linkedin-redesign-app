import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import styles from './MessagesMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { HeaderStateContext } from '../../context/Header';

class MessagesButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClickButton = this.onClickButton.bind(this);
  }

  static contextType = HeaderStateContext;

  onClickButton() {
    if (this.context.data.tab === 'messages') {
      this.context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      this.context.dispatch({
        type: 'SET_TAB',
        payload: 'messages'
      });
    }
  }

  componentDidUpdate() {
    if (this.context.data.tab === 'messages') {
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
      ease: Power3.easeOut,
    });
  }

  hideDrop() {
    TweenMax.to(this.dropRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.easeOut,
    });
  }

  render() {
    return (
      <div className={`ml-3 ${styles.wrapper}`}>
        <button
          aria-expanded="false"
          className={`${styles.navBarButtons} ${this.context.data.tab === 'messages' ? styles.buttonActive : ''}`}
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
              <button type="button" onClick={this.onClickButton}>
                <span className="lnr lnr-cross" />
              </button>
            </div>
          </div>
          <div className="content px-4">
            <div className={`py-4 ${styles.dropContentItem}`}>
              <ProfileDisplay
                image="/images/me.jpg"
                imageSize={50}
                title="Robert Tayler"
                subtitle="Hi Claudio, would you mind sharing"
              />
            </div>
            <div className={`py-4 ${styles.dropContentItem}`}>
              <ProfileDisplay
                image="/images/me.jpg"
                imageSize={50}
                title="James Daniel"
                subtitle="Im available now if its convenient?"
              />
            </div>
            <div className={`py-4 ${styles.dropContentItem}`}>
              <ProfileDisplay
                image="/images/me.jpg"
                imageSize={50}
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
