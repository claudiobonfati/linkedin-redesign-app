import React from 'react';
import PropTypes from 'prop-types';
import styles from './Polaroid.module.sass';
import ConditionalWrapper from '../utils/ConditionalWrapper';

const polaroid = (props) => (
  <div className={styles.wrapper}>
    <ConditionalWrapper
      condition={props.link}
      wrapper={(children) => <a href={props.link} className={styles.linkWrapper}>{children}</a>}
    >
      {props.image
      && (
        <div className={styles.imageWrapper} style={{ padding: props.imagePadding }}>
          <div className={styles.imageBox}>
            <img
              src={props.image}
              alt="Cover"
              className={styles.image}
            />
          </div>
        </div>
      )}
      {props.title
      && (
        <div className={`py-3 px-2 text-center ${styles.title}`}>
          {props.title}
        </div>
      )}
    </ConditionalWrapper>
  </div>
);

polaroid.propTypes = {
  title: PropTypes.string,
  imagePadding: PropTypes.number,
  link: PropTypes.string,
};

polaroid.defaultProps = {
  title: null,
  imagePadding: 0,
  link: null,
};

export default polaroid;
