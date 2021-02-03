import React, {
  useContext, useState, useRef, useEffect, useMemo,
} from 'react';
import { TimelineMax, Power3 } from 'gsap';
import PropTypes from 'prop-types';
import ProfileDisplay from '../ProfileDisplay';
import styles from './Search.module.sass';
import { HeaderContext } from '../../context/Header';

const search = (props) => {
  const context = useContext(HeaderContext);

  const [field, setField] = useState(''); // Store search while typing
  const [term, setTerm] = useState(null); // Save term searched

  let termBoxRef = useRef(null);
  let inputRef = useRef(null);
  let dropRef = useRef(null);
  let dropContentRef = useRef(null);

  const tlShowTerm = useMemo(() => new TimelineMax({ paused: true }), []);
  const tlShowQuickResult = useMemo(() => new TimelineMax({ paused: true }), []);

  const searchAll = () => {
    console.log('Searching for: ', term);
  };

  /**
   * Function to fetch bests results while user is typing
   */
  const quickSearch = () => {
    context.dispatch({
      type: 'SET_TAB',
      payload: 'search',
    });
  };

  useEffect(() => {
    tlShowTerm.from(termBoxRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.easeOut,
    });

    tlShowQuickResult
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

  useEffect(() => {
    if (context.data.tab === 'search') {
      tlShowQuickResult.play();
    } else {
      tlShowQuickResult.reverse();
    }
  }, [context]);

  useEffect(() => {
    if (field === '' && term) {
      searchAll();
      tlShowTerm.play();

      if (props.quickSearch) {
        context.dispatch({ type: 'CLOSE_TAB' });
      }
    }
  }, [field]);

  const handleChangeInput = ({ target }) => {
    if (props.quickSearch) {
      if (target.value.length > 4) {
        quickSearch();
      } else {
        context.dispatch({ type: 'CLOSE_TAB' });
      }
    }

    setField(target.value);
  };

  const handleKeyDownInput = (event) => {
    if (event.key === 'Enter' && field !== '') {
      setTerm(field);
      setField('');
    } else if (event.key === 'Backspace') {
      if (term && field === '') {
        tlShowTerm.reverse();

        setTimeout(() => {
          setField(term);
          setTerm(null);
        }, tlShowTerm.duration() * 1000);
      }
    }
  };

  const handleClearTerm = () => {
    tlShowTerm.reverse();

    setTimeout(() => {
      inputRef.focus();
      setTerm(null);
    }, tlShowTerm.duration() * 1000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchInputWrapper}>
        <div className={`${styles.termBox} ${term ? styles.termBoxShow : ''}`} ref={(ref) => { termBoxRef = ref; }}>
          <span>{ term }</span>
          <button
            aria-expanded="false"
            className={styles.termBoxCloseButton}
            type="button"
            onClick={handleClearTerm}
          >
            X
          </button>
        </div>
        <input
          value={field}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDownInput}
          className={styles.searchInput}
          ref={(ref) => { inputRef = ref; }}
          placeholder={!term ? 'Search' : ''}
          role="combobox"
          aria-controls=""
          aria-autocomplete="list"
          aria-activedescendant=""
          aria-expanded="false"
          aria-owns=""
          aria-label="Search"
          type="text"
        />
        <span className={`lnr lnr-magnifier ${styles.searchIcon}`} />
      </div>
      <div className={styles.wrapperDrop} ref={(ref) => { dropRef = ref; }}>
        <div className="container py-2 py-sm-4">
          <div className="row justify-content-center" ref={(ref) => { dropContentRef = ref; }}>
            <div className="col-md-12 mb-5">
              <div className="row align-items-center">
                <div className="col-md-3 text-left text-md-right pr-5 py-3 ">
                  <h6 className={styles.dropSectionTitle}>
                    People
                  </h6>
                </div>
                <div className="col-md-6 border-left-gray pl-4">
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div>
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-5">
              <div className="row align-items-center">
                <div className="col-md-3 text-right pr-5">
                  <h6 className={styles.dropSectionTitle}>
                    Companies
                  </h6>
                </div>
                <div className="col-md-6 border-left-gray pl-4">
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div>
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row align-items-center">
                <div className="col-md-3 text-right pr-5">
                  <h6 className={styles.dropSectionTitle}>
                    Clients
                  </h6>
                </div>
                <div className="col-md-6 border-left-gray pl-4">
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div className="pb-4">
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                  <div>
                    <ProfileDisplay
                      image="/images/me.jpg"
                      imageSize={50}
                      title="Jenson Kent"
                      subtitle="Trainee - Corporate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

search.propTypes = {
  quickSearch: PropTypes.bool, // Enable/disable pre-search white typing in field
};

search.defaultProps = {
  quickSearch: true,
};

export default search;
