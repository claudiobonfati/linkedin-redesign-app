import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './ProfileDisplay.module.sass';

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.imageAside} ${this.props.imageOnTop ? 'align-self-start mt-1' : ''}`} style={{ flexBasis: this.props.imageSize }}>
          <Image
            src={this.props.image}
            alt="Profile picture"
            className={`circle-image ${styles.profilePic}`}
            width={this.props.imageSize}
            height={this.props.imageSize}
          />
        </div>
        <div className={`ml-3 ${styles.infoWrapper}`}>
          <div className={styles.infoTitle}>
            {this.props.title}
          </div>
          { this.props.subtitle
          && (
            <div className={styles.infoSubtitle}>
              {this.props.subtitle}
            </div>
          )}
        </div>
        {this.props.rightContent
        && (
          <div className={`ml-3 ${styles.rightWrapper} ${this.props.rightContentOnTop ? 'align-self-start' : ''}`}>
            {this.props.rightContent}
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightContent: PropTypes.string,
  rightContentOnTop: PropTypes.bool,
};

ProfileDisplay.defaultProps = {
  imageSize: 40,
  rightContent: null,
  rightContentOnTop: false,
  imageOnTop: false,
  subtitle: null,
};

export default ProfileDisplay;
