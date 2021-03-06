import Router from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

export const useTransitionFix = () => {
  const cleanupRef = useRef(() => {});

  useEffect(() => {
    const changeListener = () => {
      // Create a clone of every <style> and <link> that currently affects the page. It doesn't
      // matter if Next.js is going to remove them or not since we are going to remove the copies
      // ourselves later on when the transition finishes.
      const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
      const copies = [...nodes].map((el) => el.cloneNode(true));

      for (let copy of copies) {
        // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
        // change process.
        copy.removeAttribute('data-n-p');
        copy.removeAttribute('data-n-href');

        // Add duplicated nodes to the DOM.
        document.head.appendChild(copy);
        console.log('here - CLONE');
      }

      cleanupRef.current = () => {
        for (let copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);

          console.log('here - DELETE');
        }
      };
    };

    Router.events.on('beforeHistoryChange', changeListener);

    return () => {
      Router.events.off('beforeHistoryChange', changeListener);
      cleanupRef.current();
    };
  }, []);

  // Return an fixed reference function that calls the internal cleanup reference.
  return useCallback(() => {
    cleanupRef.current();
  }, []);
};
