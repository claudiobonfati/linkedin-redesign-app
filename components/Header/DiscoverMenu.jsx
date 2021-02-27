import React, {
  useEffect, useRef, useMemo, useState,
} from 'react';
import { TimelineMax, Power3 } from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FeatherIcon from 'feather-icons-react';
import styles from './DiscoverMenu.module.sass';
import Search from './Search';
import { useHeader } from '../../context/Header';

const discoverMenu = () => {
  const context = useHeader();
  let dropRef = useRef(null);
  let dropContentRef = useRef(null);
  const router = useRouter();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    let baseRouter = router.pathname.split('/')[1];

    switch (baseRouter) {
      case 'messages':
        setTitle('Messages');
        break;
      case 'me':
        setTitle('My Profile');
        break;
      case 'profile':
        setTitle('People');
        break;
      case 'company':
        setTitle('Companies');
        break;
      case 'search':
        setTitle('Search');
        break;
      default:
        setTitle('Discover');
        break;
    }
  }, [router]);

  const tlShowMenu = useMemo(() => new TimelineMax({ paused: true }), []);

  useEffect(() => {
    tlShowMenu
      .from(dropRef, 0.5, {
        css: {
          display: 'none',
          height: 0,
        },
      })
      .from(dropContentRef, 0.5, {
        css: {
          opacity: 0,
          transform: 'translateY(-20px)',
        },
        ease: Power3.easeOut,
      });
  }, []);

  const onClickButton = () => {
    if (context.data.tab === 'discover') {
      context.dispatch({ type: 'CLOSE_TAB' });
    } else {
      context.dispatch({
        type: 'SET_TAB',
        payload: 'discover',
      });
    }
  };

  useEffect(() => {
    if (context.data.tab === 'discover') {
      tlShowMenu.play();
    } else {
      tlShowMenu.reverse();
    }
  }, [context]);

  return (
    <div className={`${styles.wrapper}`}>
      <button
        aria-expanded="false"
        className={`
          ${styles.buttonSelect} 
          ${context.data.tab === 'discover' ? styles.buttonActive : ''}
        `}
        type="button"
        onClick={onClickButton}
      >
        {title}
        <FeatherIcon icon="chevron-down" size="20" strokeWidth="1.2" />
      </button>
      <div className={styles.wrapperDrop} ref={(ref) => { dropRef = ref; }}>
        <div className="container py-2 py-sm-5">
          <div className="row justify-content-center" ref={(ref) => { dropContentRef = ref; }}>
            <div className="col-12 d-block d-md-none pt-3 pb-2">
              <Search quickSearch={false} />
            </div>
            <div className="col-lg-2 col-md-3 d-none d-md-block pl-0 align-self-center">
              <nav className={`border-right-gray ${styles.menuNav} ${styles.spaced}`}>
                <ul>
                  <li><Link href="/" scroll={false}>Home</Link></li>
                  <li><Link href="/messages/all" scroll={false}>Messages</Link></li>
                  <li><Link href="/articles" scroll={false}>Articles</Link></li>
                  <li><Link href="/companies" scroll={false}>Companies</Link></li>
                  <li><span className={styles.disabled}>Jobs</span></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-2 col-sm-3 col-12 py-3">
              <h6>
                Profile
              </h6>
              <nav className={styles.menuNav}>
                <ul>
                  <li><Link href="/me/improve">Edit profile</Link></li>
                  <li><Link href="/me/details">My profile</Link></li>
                  <li><Link href="/me/improve">Improve</Link></li>
                  <li><span className={styles.disabled}>Who viewed</span></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-2 col-sm-3 col-12 py-3">
              <h6>
                My network
              </h6>
              <nav className={styles.menuNav}>
                <ul>
                  <li><Link href="/me/contacts">Connections</Link></li>
                  <li><Link href="/me/contacts">Add contacts</Link></li>
                  <li><Link href="/me/contacts">People you know</Link></li>
                  <li><Link href="/messages/all">Messages</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-2 col-sm-3 col-12 py-3">
              <h6>
                Interests
              </h6>
              <nav className={styles.menuNav}>
                <ul>
                  <li><span className={styles.disabled}>Companies</span></li>
                  <li><span className={styles.disabled}>Groups</span></li>
                  <li><span className={styles.disabled}>Slideshare</span></li>
                  <li><span className={styles.disabled}>Learning</span></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-2 col-sm-3 col-12 py-3">
              <h6>
                Business
              </h6>
              <nav className={styles.menuNav}>
                <ul>
                  <li><span className={styles.disabled}>Post a job</span></li>
                  <li><span className={styles.disabled}>Talent solution</span></li>
                  <li><span className={styles.disabled}>Advertise</span></li>
                  <li><span className={styles.disabled}>Sale solutions</span></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default discoverMenu;
