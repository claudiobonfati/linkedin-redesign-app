import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import Image from 'next/image';
import { TweenMax, Power3 } from 'gsap';
import styles from './NotificationsMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { HeaderContext } from '../../context/Header';

const notificationsMenu = () => {
  const [tab, setTab] = useState('notifications');
  const context = useContext(HeaderContext);
  let dropRef = useRef(null);

  const onClickButton = () => {
    if (context.data.tab === 'notifications') {
      context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      context.dispatch({
        type: 'SET_TAB',
        payload: 'notifications',
      });
    }
  };

  const showDrop = () => {
    TweenMax.to(dropRef, 0.2, {
      css: {
        opacity: 1,
        display: 'block',
        scale: 1,
      },
      ease: Power3.inOut,
    });
  };

  const hideDrop = () => {
    TweenMax.to(dropRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.inOut,
    });
  };

  useEffect(() => {
    if (context.data.tab === 'notifications') {
      showDrop();
    } else {
      hideDrop();
    }
  }, [context]);

  return (
    <div className={`ml-3 ${styles.wrapper}`}>
      <button
        aria-expanded="false"
        className={`${styles.navBarButtons} ${context.data.tab === 'notifications' ? styles.buttonActive : ''}`}
        type="button"
        onClick={onClickButton}
      >
        <span className="lnr lnr-flag" />
      </button>
      <div className={styles.wrapperDrop} ref={(ref) => { dropRef = ref; }}>
        <nav className={styles.dropHeader}>
          <ul>
            <li className={tab === 'notifications' ? styles.activeItem : ''}>
              <button type="button" onClick={() => setTab('notifications')}>
                Notifications
              </button>
            </li>
            <li className={tab === 'requests' ? styles.activeItem : ''}>
              <button type="button" onClick={() => setTab('requests')}>
                Requests
              </button>
            </li>
          </ul>
        </nav>
        <div className={`${styles.dropContentOuter} ${tab === 'notifications' ? styles.tabNotifications : styles.tabRequests}`}>
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
};

export default notificationsMenu;
