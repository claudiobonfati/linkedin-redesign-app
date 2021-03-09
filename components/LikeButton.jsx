import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import styles from './LikeButton.module.sass';
import MaskNumber from '../utils/MaskNumber';

const likeButton = (props) => {
  let [liked, setLiked] = useState(false);

  const likeHandle = () => {
    setLiked((prevState) => !prevState);
  };

  return (
    <button
      className={`py-4 ${styles.likeButton} ${liked ? styles.heartAnimation : ''}`}
      type="button"
      onClick={likeHandle}
    >
      <span className={styles.heartEffect} style={{backgroundImage: `url(${process.env.BASE_PATH}/images/heart-animation.png)`}}/>
      <FeatherIcon icon="heart" size="20" strokeWidth="1.2" />
      <div className={styles.buttonLabel}>
        {liked ? MaskNumber(props.likes + 1) : MaskNumber(props.likes) }
      </div>
    </button>
  );
};

likeButton.propTypes = {
  likes: PropTypes.number.isRequired,
};

export default likeButton;
