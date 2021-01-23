import React, { useRef, useEffect } from 'react';
import { TweenMax } from 'gsap';
import Header from './Header/Header';
import MenuTab from './MenuTab/Tab';
import styles from './Layout.module.sass';

const layout = (props) => {
  let appRef = useRef(null);

  useEffect(() => {
    TweenMax.to(appRef, 0.5, { css: { opacity: 1 } }).delay(0.5);
  });

  return (
    <div className={styles.layoutWrapper} ref={(ref) => { appRef = ref; }}>
      <Header />
      <MenuTab />
      <div className={styles.contentWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default layout;
