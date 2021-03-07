import React, {
  useState, useRef, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { TimelineMax, Power3 } from 'gsap';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import ProfileDisplay from '../ProfileDisplay';
import styles from './Search.module.sass';
import { useHeader } from '../../context/Header';
import { SEARCH_USERS_COMPANIES } from '../../graphql/queries';
import ApolloClient from '../../graphql/apollo';

const search = (props) => {
  const context = useHeader();
  const resultsLimit = 3;
  const router = useRouter();

  const [field, setField] = useState(''); // Store search while typing
  const [term, setTerm] = useState(router.query.keywords || null); // Save term searched
  const [result, setResult] = useState(null); // Store quick search result

  let termBoxRef = useRef(null);
  let inputRef = useRef(null);
  let dropRef = useRef(null);
  let dropContentRef = useRef(null);

  const tlShowTerm = useMemo(() => new TimelineMax({ paused: true }), []);
  const tlShowQuickResult = useMemo(() => new TimelineMax({ paused: true }), []);

  useEffect(() => {
    if (router.query.keywords !== null
    && router.query.keywords !== undefined
    && router.query.keywords !== '') {
      setTerm(router.query.keywords);
      tlShowTerm.play();
    }
  }, [router.query.keywords]);

  // Fetch best results while user is typing
  const quickSearch = async () => {
    try {
      let response = await ApolloClient.query({
        query: SEARCH_USERS_COMPANIES,
        variables: {
          search: field,
          page: 0,
          limit: resultsLimit,
        },
      });

      if (response.data.allUsers.length > 0 || response.data.allCompanies.length) {
        setResult(response.data);

        context.dispatch({
          type: 'SET_TAB',
          payload: 'search',
        });
      }
    } catch (e) {
      context.dispatch({
        type: 'CLOSE_TAB',
      });
    }
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
          opacity: 0,
          transform: 'scaleY(0)',
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
      router.push({
        pathname: '/search/people-companies',
        query: {
          keywords: term,
        },
      });

      tlShowTerm.play();

      if (props.quickSearch) {
        context.dispatch({ type: 'CLOSE_TAB' });
      }
    }
  }, [field]);

  const handleChangeInput = ({ target }) => {
    setField(target.value);
  };

  useEffect(() => {
    if (props.quickSearch) {
      if (field.length > 2) {
        quickSearch();
      } else {
        context.dispatch({ type: 'CLOSE_TAB' });
      }
    }
  }, [field]);

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

      router.push({
        pathname: '/',
      });
    }, tlShowTerm.duration() * 1000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchInputWrapper}>
        <div
          className={`
            ${styles.termBox} 
            ${term ? styles.termBoxShow : ''}
          `}
          ref={(ref) => { termBoxRef = ref; }}
        >
          <span>{ term }</span>
          <button
            aria-expanded="false"
            className={styles.termBoxCloseButton}
            type="button"
            onClick={handleClearTerm}
          >
            <FeatherIcon icon="x" size="20" strokeWidth="1.2" />
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
        <FeatherIcon icon="search" size="20" strokeWidth="1.2" className={styles.searchIcon} />
      </div>
      <div className={styles.wrapperDrop} ref={(ref) => { dropRef = ref; }}>
        <div className="container py-2 py-sm-5">
          <div className="row justify-content-center" ref={(ref) => { dropContentRef = ref; }}>
            {(result?.allUsers
            && result.allUsers.length > 0)
            && (
              <div className={`col-md-12 ${result.allCompanies.length > 0 ? 'mb-5' : ''}`}>
                <div className="row align-items-center">
                  <div className="col-md-3 text-left text-md-right pr-5 py-3 ">
                    <h6 className={`${styles.dropSectionTitle} mb-0`}>
                      People
                    </h6>
                  </div>
                  <div className="col-md-6 border-left-gray pl-4">
                    {result.allUsers.map((user, index) => (
                      <div key={`user_${user.id}`}>
                        {user.id !== '1' && (
                          <div className={`${index !== result.allUsers.length - 1 ? 'pb-4' : ''}`}>
                            <ProfileDisplay
                              image={user.photo}
                              imageSize={50}
                              title={user.name}
                              subtitle={user.headline}
                              link={`/profile/${user.username}/details`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {(result?.allCompanies
            && result.allCompanies.length > 0)
            && (
              <div className="col-md-12">
                <div className="row align-items-center">
                  <div className="col-md-3 text-right pr-5">
                    <h6 className={`${styles.dropSectionTitle} mb-0`}>
                      Companies
                    </h6>
                  </div>
                  <div className="col-md-6 border-left-gray pl-4">
                    {result.allCompanies.map((company, index) => (
                      <div className={`${index !== result.allCompanies.length - 1 ? 'pb-4' : ''}`} key={`company_${company.id}`}>
                        <ProfileDisplay
                          image={company.logo}
                          imageSize={50}
                          title={company.name}
                          subtitle={company.headquarters}
                          link={`/company/${company.nameslug}/home`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
