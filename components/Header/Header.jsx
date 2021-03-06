import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-image-and-background-image-fade';
import Link from 'next/link';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../../graphql/apollo';
import styles from './Header.module.sass';
import Search from './Search';
import DiscoverMenu from './DiscoverMenu';
import NotificationsMenu from './NotificationsMenu';
import MessagesMenu from './MessagesMenu';
import { useHeader } from '../../context/Header';

const header = () => {
  const router = useRouter();
  const context = useHeader();
  const [user, setUser] = useState();

  const closeTabs = () => {
    context.dispatch({ type: 'CLOSE_TAB' });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('current-user-preview'));
    if (currentUser) {
      setUser(currentUser);
    }

    router.events.on('routeChangeStart', closeTabs);

    return () => {
      router.events.off('routeChangeStart', closeTabs);
    };
  }, []);

  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3 col-6 position-static d-flex py-2 py-sm-3 pr-0">
            <div className="align-self-center">
              <Link href="/" scroll={false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" className={`${styles.logo}`}>
                  <path d="M377.6.2H126.4C56.8.2,0,57,0,126.6V378.2c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6C504,57,447.2.2,377.6.2ZM168,408.2H96v-208h72Zm-36.4-240a36.8,36.8,0,1,1,36.8-36.8C168,151.8,151.6,168.2,131.6,168.2Zm276.8,240H348V307.4c0-24.4-3.2-55.6-36.4-55.6-34,0-39.6,26.4-39.6,54V408.2H212v-208h56v28h1.6c8.8-16,29.2-28.4,61.2-28.4,66,0,77.6,38,77.6,94.4v114Z" fill="#007fb2" />
                </svg>
              </Link>
            </div>
            <div className="border-left-gray align-self-center ml-2 pl-2 ml-sm-4 pl-sm-4">
              <DiscoverMenu />
            </div>
          </div>
          <div className="col-md-6 position-static d-none d-md-block py-2 py-sm-3">
            <Search />
          </div>
          <div className="col-md-3 col-6 position-static d-flex justify-content-end py-2 py-sm-3 pl-0">
            <ApolloProvider client={ApolloClient}>
              <MessagesMenu />
              <NotificationsMenu />
            </ApolloProvider>
            {user?.data?.photo
            && (
              <Link href="/me/details" scroll={false}>
                <a title="My profile" className={`ml-3 ${styles.navBarButtons} ${styles.profilePic}`}>
                  <Image
                    src={user.data.photo}
                    alt="Profile picture"
                    className={`circle-image ${styles.profilePic}`}
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
