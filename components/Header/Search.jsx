import React from 'react';
import { TimelineMax, Power3 } from 'gsap';
import PropTypes from 'prop-types';
import ProfileDisplay from '../ProfileDisplay';
import styles from './Search.module.sass';
import { HeaderStateContext } from '../../context/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: '', // Store search while typing
      term: null, // Save term searched
    };

    this.tlShowTerm = new TimelineMax({ paused: true });
    this.tlShowQuickResult = new TimelineMax({ paused: true });

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
    this.handleClearTerm = this.handleClearTerm.bind(this);
    this.quickSearch = this.quickSearch.bind(this);
    this.search = this.search.bind(this);
  }

  static contextType = HeaderStateContext;

  componentDidMount() {
    this.tlShowTerm.from(this.termBoxRef, 0.2, {
      css: {
        opacity: 0,
        display: 'none',
        scale: 0.95,
      },
      ease: Power3.easeOut,
    });

    this.tlShowQuickResult
    .from(this.dropRef, 0.5, {
      css: {
        display: 'none',
        height: 0,
      },
    })
    .from(this.dropContentRef, 0.5, {
      css: {
        opacity: 0,
        transform: 'translateY(-20px)',
      },
      ease: Power3.easeOut,
    });
  }

  componentDidUpdate() {
    if (this.context.data.tab === 'search') {
      this.tlShowQuickResult.play();
    } else {
      this.tlShowQuickResult.reverse();
    }
  }

  handleChangeInput({ target }) {
    this.setState({
      field: target.value,
    }, () => {
      if (this.props.quickSearch) {
        if (target.value.length > 4) {
          this.quickSearch();
        } else {
          this.context.dispatch({ type: 'CLOSE_TAB' });
        }
      }
    });
  }

  handleKeyDownInput(event) {
    if (event.key === 'Enter' && this.state.field !== '') {
      this.setState((prevState) => ({
        field: '',
        term: prevState.field,
      }), () => {
        this.search();
        this.tlShowTerm.play();
        if (this.props.quickSearch) {
          this.context.dispatch({ type: 'CLOSE_TAB' });
        }
      });
    } else if (event.key === 'Backspace') {
      if (this.state.term && this.state.field === '') {
        this.tlShowTerm.reverse();

        setTimeout(() => {
          this.setState((prevState) => ({
            field: prevState.term,
            term: null,
          }));
        }, this.tlShowTerm.duration() * 1000);
      }
    }
  }

  handleClearTerm() {
    this.tlShowTerm.reverse();

    setTimeout(() => {
      this.setState({
        term: null,
      });
      this.inputRef.focus();
    }, this.tlShowTerm.duration() * 1000);
  }

  search() {
    console.log('Searching for: ', this.state.term);
  }

  /**
   * Function to fetch bests results while user is typing
   */
  quickSearch() {
    this.context.dispatch({
      type: 'SET_TAB',
      payload: 'search'
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchInputWrapper}>
          <div className={`${styles.termBox} ${this.state.term ? styles.termBoxShow : ''}`} ref={(ref) => { this.termBoxRef = ref; }}>
            <span>{ this.state.term }</span>
            <button
              aria-expanded="false"
              className={styles.termBoxCloseButton}
              type="button"
              onClick={this.handleClearTerm}
            >
              X
            </button>
          </div>
          <input
            value={this.state.field}
            onChange={this.handleChangeInput}
            onKeyDown={this.handleKeyDownInput}
            className={styles.searchInput}
            ref={(ref) => { this.inputRef = ref; }}
            placeholder={!this.state.term ? 'Search' : ''}
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
        <div className={styles.wrapperDrop} ref={(ref) => { this.dropRef = ref; }}>
          <div className="container py-2 py-sm-4">
            <div className="row justify-content-center" ref={(ref) => { this.dropContentRef = ref; }}>
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
  }
}

Search.propTypes = {
  quickSearch: PropTypes.bool, // Enable/disable pre-search white typing in field
};

Search.defaultProps = {
  quickSearch: true,
};

export default Search;
