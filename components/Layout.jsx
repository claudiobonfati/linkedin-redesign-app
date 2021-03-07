import React, { useRef, useEffect } from 'react';
import { TweenMax } from 'gsap';
import { StoreProvider } from 'easy-peasy';
import ProfileStore from '../redux/profileStore';
import Header from './Header/Header';
import MenuTab from './MenuTab/Tab';
import styles from './Layout.module.sass';
import { HeaderProvider } from '../context/Header';

const layout = (props) => {
  let appRef = useRef(null);

  useEffect(() => {
    TweenMax.to(appRef, 0.5, { css: { opacity: 1 } }).delay(0.3);
  });

  return (
    <div className={styles.layoutWrapper} ref={(ref) => { appRef = ref; }}>
      <StoreProvider store={ProfileStore}>
        <HeaderProvider>
          <Header />
        </HeaderProvider>
        <MenuTab />
        <div className={styles.contentWrapper}>
          <div className={`${styles.scrollWrapper} stickyArea`}>
            {props.children}
          </div>
        </div>
      </StoreProvider>
    </div>
  );
};

export default layout;
