import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './ProfileDisplay.module.sass';
import ConditionalWrapper from '../utils/ConditionalWrapper';

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.wrapper}`}>
        <div
          className={`${styles.imageAside} ${this.props.imageOnTop ? 'align-self-start mt-1' : ''} ${this.props.imageSide === 'right' ? styles.imageRight : ''}`}
          style={{ flexBasis: this.props.imageSize }}
        >
          <Image
            src={this.props.image}
            alt="Profile picture"
            className={`circle-image ${styles.profilePic}`}
            width={this.props.imageSize}
            height={this.props.imageSize}
          />
        </div>
        <div className={`${styles.infoWrapper} ${this.props.imageSide === 'left' ? 'ml-3' : 'mr-3'}`}>
          <div className={styles.infoTitle}>
            {this.props.title}
          </div>
          { this.props.blueLine
          && (
            <div className={styles.infoBlueLine}>
              {this.props.blueLine}
            </div>
          )}
          { this.props.subtitle
          && (
            <ConditionalWrapper
              condition={this.props.imageSide === 'right'}
              wrapper={(children) => <i>{children}</i>}
            >
              <div className={styles.infoSubtitle}>
                {this.props.subtitle}
              </div>
            </ConditionalWrapper>
          )}
        </div>
        {this.props.sideContent
        && (
          <div className={`ml-3 ${styles.rightWrapper} ${this.props.sideContentOnTop ? 'align-self-start' : ''}`}>
            {this.props.sideContent}
          </div>
        )}
        {(this.props.rightButtonText && this.props.rightButtonLink)
        && (
          <div className={`ml-3 ${styles.rightWrapper}`}>
            <Link href={this.props.rightButtonLink}>
              {this.props.rightButtonText}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

ProfileDisplay.propTypes = {
  image: PropTypes.string.isRequired,
  imageOnTop: PropTypes.bool,
  imageSize: PropTypes.number,
  imageSide: PropTypes.oneOf(['right', 'left']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  blueLine: PropTypes.string,
  sideContent: PropTypes.string,
  sideContentOnTop: PropTypes.bool,
  rightButtonText: PropTypes.string,
  rightButtonLink: PropTypes.string,
};

ProfileDisplay.defaultProps = {
  imageSize: 40,
  sideContent: null,
  sideContentOnTop: false,
  imageSide: 'left',
  imageOnTop: false,
  subtitle: null,
  blueLine: null,
  rightButtonText: null,
  rightButtonLink: null,
};

export default ProfileDisplay;
