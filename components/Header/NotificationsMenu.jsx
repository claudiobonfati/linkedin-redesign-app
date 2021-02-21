import React, {
  useEffect, useState, useRef,
} from 'react';
import Image from 'next/image';
import { TweenMax, Power3 } from 'gsap';
import Link from 'next/link';
import styles from './NotificationsMenu.module.sass';
import ProfileDisplay from '../ProfileDisplay';
import { useHeader } from '../../context/Header';
import { useNotifications, useViewers, useRequests } from '../../graphql/hooks';

const notificationsMenu = () => {
  const [tab, setTab] = useState('notifications');
  const [alert, setAlert] = useState(true);
  const context = useHeader();
  let dropRef = useRef(null);
  const notifications = useNotifications(0, 10);
  const viewers = useViewers(0, 10);
  const requests = useRequests(0, 10);

  console.log(notifications);

  const onClickButton = () => {
    if (context.data.tab === 'notifications') {
      context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      context.dispatch({
        type: 'SET_TAB',
        payload: 'notifications',
      });

      setAlert(false);
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
        className={`
          ${styles.navBarButtons} 
          ${context.data.tab === 'notifications' ? styles.buttonActive : ''}
          ${alert ? styles.alertIcon : ''}
        `}
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
              {(viewers.data
              && viewers.data.length > 0)
              && (
                <div className={`py-4 ${styles.dropContentItem}`}>
                  <span className="d-block mb-3">
                    {`${viewers.data.length + 3} people viewed you profile`}
                  </span>
                  <div className={styles.listProfilePics}>
                    {viewers.data.map((item) => (
                      <div className="mr-2" key={item.id}>
                        <Link href={`/profile/${item.User.username}/details`}>
                          <a title={item.User.name}>
                            <Image
                              src={item.User.photo}
                              alt="Profile picture"
                              className={`circle-image ${styles.profilePic}`}
                              width={40}
                              height={40}
                            />
                          </a>
                        </Link>
                      </div>
                    ))}
                    <div className={`mr-2 small ${styles.profilePic}`}>
                      <span>+3</span>
                    </div>
                  </div>
                </div>
              )}
              {(notifications.data
              && notifications.data.length > 0)
              && (
                <>
                  {notifications.data.map((item) => (
                    <div className={`py-4 ${styles.dropContentItem}`} key={item.id}>
                      <Link href={`${item.type === 'connection' ? `/profile/${item.User.username}/details` : `/profile/${item.User.username}/posts`}`}>
                        <a title={item.User.name}>
                          <ProfileDisplay
                            image={item.User.photo}
                            imageSize={50}
                            title={item.User.name}
                            subtitle={item.message}
                          />
                        </a>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={`px-4 ${styles.dropContent}`}>
              {(requests.data
              && requests.data.length > 0)
              && (
                <>
                  {requests.data.map((item) => (
                    <div className={`py-4 ${styles.dropContentItem}`} key={item.id}>
                      <Link href={`/profile/${item.User.username}/details`}>
                        <a title={item.User.name}>
                          <ProfileDisplay
                            image={item.User.photo}
                            imageSize={50}
                            title={item.User.name}
                            subtitle={item.message}
                          />
                        </a>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notificationsMenu;
