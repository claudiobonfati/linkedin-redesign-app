import React from 'react';
import styles from './Search.module.sass';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.searchWrapper}>
        <input className={styles.searchInput} placeholder="Search linkedin" role="combobox" aria-controls="" aria-autocomplete="list" aria-activedescendant="" aria-expanded="false" aria-owns="" aria-label="Search linkedin" type="text" />
        <span className={`lnr lnr-magnifier ${styles.searchIcon}`} />
      </div>
    );
  }
}

export default Search;
