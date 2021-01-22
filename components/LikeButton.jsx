import React from 'react';
import PropTypes from 'prop-types';
import styles from './LikeButton.module.sass';

const likeButton = (props) => (
  <button
    className={`py-4 ${styles.likeButton} ${props.liked ? styles.heartAnimation : ''}`}
    type="button"
    onClick={props.action}
  >
    <span className="lnr lnr-heart" />
    <div className={styles.buttonLabel}>
      {props.liked ? (props.likes + 1) : props.likes }
    </div>
  </button>
);

likeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};

export default likeButton;
