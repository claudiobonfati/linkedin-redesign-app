import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './SimpleButton.module.sass';

const simpleButton = (props) => (
  <>
    {!props.outside ? (
      <Link to={props.to} as={props.as} scroll={false}>
        <a title={props.text} className={`${styles.button} ${props.noBorderTop ? styles.noBorderTop : null}`}>
          {props.text}
        </a>
      </Link>
    ) : (
      <a
        className={`${styles.button} ${props.noBorderTop ? styles.noBorderTop : null}`}
        href={props.to}
        target="_blank"
        rel="noreferrer"
      >
        {props.text}
      </a>
    )}
  </>
);

simpleButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  as: PropTypes.string,
  outside: PropTypes.bool.isRequired,
  noBorderTop: PropTypes.bool,
};

simpleButton.defaultProps = {
  text: 'Click here',
  to: '/',
  outside: false,
  noBorderTop: false,
};

export default simpleButton;
