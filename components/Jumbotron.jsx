import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-image-and-background-image-fade';
import styles from './Jumbotron.module.sass';
import MaskNumber from '../utils/MaskNumber';

const jumbotron = (props) => (
  <div className={styles.wrapper}>
    <div className={`p-3 ${styles.jumbotron}`}>
      <div className={styles.contentImage}>
        <Image
          src={props.cover}
          lazyLoad
          className={styles.contentImage}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          <img src={props.profileImage} alt={props.profileName} />
        </div>
        <h1 className={styles.profileName}>
          {props.profileName}
        </h1>
        <div className={styles.profileSubtitle}>
          {props.profileSubtitle}
        </div>
        <div className={styles.bottomInfo}>
          <div className={`${styles.item} ${styles.left}`}>
            <div className={styles.title}>
              {MaskNumber(props.leftTitle)}
            </div>
            <div className={styles.subtitle}>
              {props.leftSubtitle}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>
              {MaskNumber(props.rightTitle)}
            </div>
            <div className={styles.subtitle}>
              {props.rightSubtitle}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="p-3 d-flex justify-content-between">
      {(props.leftButtonText
      && props.leftButtonLink)
      && (
        <a href={props.leftButtonLink} target="_blank" rel="noreferrer" className={`${styles.button} align-self-start`}>
          {props.leftButtonText}
        </a>
      )}
      <button type="button" className={`${styles.button} align-self-end`}>
        Follow company
      </button>
    </div>
  </div>
);

jumbotron.propTypes = {
  cover: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string,
  profileSubtitle: PropTypes.string,
  leftTitle: PropTypes.string,
  leftSubtitle: PropTypes.string,
  rightTitle: PropTypes.string,
  rightSubtitle: PropTypes.string,
  leftButtonText: PropTypes.string,
  leftButtonLink: PropTypes.string,
};

jumbotron.defaultProps = {
  profileName: null,
  profileSubtitle: null,
  leftTitle: null,
  leftSubtitle: null,
  rightTitle: null,
  rightSubtitle: null,
  leftButtonText: null,
  leftButtonLink: null,
};

export default jumbotron;
