import React from 'react';
import { Image } from 'react-image-and-background-image-fade';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './ProfileDisplay.module.sass';
import ConditionalWrapper from '../utils/ConditionalWrapper';

const profileDisplay = (props) => (
  <div className={`${styles.wrapper}`}>
    <div
      className={`${styles.imageAside} ${props.imageOnTop ? 'align-self-start mt-1' : ''} ${props.imageSide === 'right' ? styles.imageRight : ''}`}
      style={{ flexBasis: props.imageSize }}
    >
      <ConditionalWrapper
        condition={props.link}
        wrapper={(children) => <Link href={props.link} scroll={false}><a>{children}</a></Link>}
      >
        <Image
          src={props.image}
          alt={props.title}
          className={`circle-image ${styles.profilePic}`}
          width={`${props.imageSize}px`}
          height={`${props.imageSize}px`}
        />
      </ConditionalWrapper>
    </div>
    <div className={`${styles.infoWrapper} ${props.imageSide === 'left' ? `ml-${props.imagePadding}` : `mr-${props.imagePadding}`}`}>
      <ConditionalWrapper
        condition={props.link}
        wrapper={(children) => <Link href={props.link} scroll={false}><a>{children}</a></Link>}
      >
        <div className={styles.infoTitle}>
          {props.title}
        </div>
      </ConditionalWrapper>
      {props.blueLine
      && (
        <div className={styles.infoBlueLine}>
          {props.blueLine}
        </div>
      )}
      {props.subtitle
      && (
        <ConditionalWrapper
          condition={props.imageSide === 'right'}
          wrapper={(children) => <i>{children}</i>}
        >
          <div
            className={`
              ${styles.infoSubtitle}
              ${props.subtitleNowrap ? styles.nowrap : ''}
            `}
          >
            {props.subtitle}
          </div>
        </ConditionalWrapper>
      )}
    </div>
    {props.sideContent
    && (
      <div className={`ml-3 ${styles.rightWrapper} ${props.sideContentOnTop ? 'align-self-start' : ''}`}>
        {props.sideContent}
      </div>
    )}
    {(props.rightButtonText && props.rightButtonLink)
    && (
      <div className={`ml-3 ${styles.rightWrapper}`}>
        <Link href={props.rightButtonLink} scroll={false}>
          {props.rightButtonText}
        </Link>
      </div>
    )}
  </div>
);

profileDisplay.propTypes = {
  link: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageOnTop: PropTypes.bool,
  imageSize: PropTypes.number,
  imageSide: PropTypes.oneOf(['right', 'left']),
  imagePadding: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subtitleNowrap: PropTypes.bool,
  blueLine: PropTypes.string,
  sideContent: PropTypes.string,
  sideContentOnTop: PropTypes.bool,
  rightButtonText: PropTypes.string,
  rightButtonLink: PropTypes.string,
};

profileDisplay.defaultProps = {
  link: null,
  imageSize: 40,
  sideContent: null,
  sideContentOnTop: false,
  imageSide: 'left',
  imageOnTop: false,
  imagePadding: '3',
  subtitle: null,
  subtitleNowrap: false,
  blueLine: null,
  rightButtonText: null,
  rightButtonLink: null,
};

export default profileDisplay;
