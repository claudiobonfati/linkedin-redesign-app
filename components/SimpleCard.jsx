import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimpleCard.module.sass';

const simpleCard = (props) => (
  <section
    className={`
      ${styles.wrapper} 
      ${props.noBorderTop ? styles.noBorderTop : ''}
    `}
  >
    <div className="px-4">
      {props.title && (
        <div className={`py-4 ${styles.header}`}>
          <h6>
            {props.title}
          </h6>
          {props.rightText && (
            <span className="color-blue">
              {props.rightText}
            </span>
          )}
        </div>
      )}
      <div
        className={`
          ${props.noPaddingBottom ? 'pt-4' : 'py-4'} 
          ${styles.content}
        `}
      >
        {props.children}
      </div>
    </div>
  </section>
);

simpleCard.propTypes = {
  title: PropTypes.string,
  rightText: PropTypes.string,
  noBorderTop: PropTypes.bool,
  noPaddingBottom: PropTypes.bool,
};

simpleCard.defaultProps = {
  title: null,
  rightText: null,
  noBorderTop: false,
  noPaddingBottom: false,
};

export default simpleCard;
