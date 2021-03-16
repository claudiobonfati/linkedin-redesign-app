import React from 'react';
import PropTypes from 'prop-types';
import styles from './NothingFound.module.sass';

const nothingFound = (props) => (
  <div className={styles.wrapper} style={{backgroundImage: `url(${process.env.BASE_PATH}/images/no-result-found.svg)`}} >
    <p className="text-center">
      {props.title}
      {props.subtitle && (
        <>
          <br />
          {props.subtitle}
        </>
      )}
    </p>
  </div>
);

nothingFound.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

nothingFound.defaultProps = {
  title: 'Nothing found. =/',
};

export default nothingFound;
