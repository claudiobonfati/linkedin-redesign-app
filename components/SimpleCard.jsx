import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimpleCard.module.sass';

const simpleCard = (props) => (
  <section className={styles.wrapper}>
    <div className="px-4">
      {props.title
      && (
        <div className={`py-4 ${styles.header}`}>
          <h6>
            {props.title}
          </h6>
          {props.rightText
          && (
            <span className="color-blue">
              {props.rightText}
            </span>
          )}
        </div>
      )}
      <div className={`py-4 ${styles.content}`}>
        {props.children}
      </div>
    </div>
  </section>
);

simpleCard.propTypes = {
  title: PropTypes.string,
  rightText: PropTypes.string,
};

simpleCard.defaultProps = {
  title: null,
  rightText: null,
};

export default simpleCard;
