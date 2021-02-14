import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './SimpleButton.module.sass';

const simpleButton = (props) => (
  <>
    {!props.outside ? (
      <Link to={props.to} as={props.as} scroll={false}>
        <a title={props.text} className={styles.button}>
          {props.text}
        </a>
      </Link>
    ) : (
      <a
        className={styles.button}
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
};

simpleButton.defaultProps = {
  text: 'Click here',
  to: '/',
  outside: false,
};

export default simpleButton;
