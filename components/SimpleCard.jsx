import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimpleCard.module.sass';

function SimpleCard(props) {
  return (
    <div className={styles.wrapper}>
      <div className="px-4">
        {props.title
        && (
          <div className={`py-4 ${styles.header}`}>
            {props.title}
          </div>
        )}
        <div className={`py-4 ${styles.content}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

SimpleCard.propTypes = {
  title: PropTypes.string,
};

SimpleCard.defaultProps = {
  title: null,
};

export default SimpleCard;
