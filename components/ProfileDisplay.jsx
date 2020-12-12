import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './ProfileDisplay.module.sass';

class NotificationsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`py-4 ${styles.wrapper}`}>
        <div className={styles.imageAside}>
          <Image
            src="https://i.pravatar.cc/300"
            alt="Profile picture"
            className={`circle-image ${styles.profilePic}`}
            width={this.props.imgSize}
            height={this.props.imgSize}
          />
        </div>
        <div className={`ml-2 ${styles.infoWrapper}`}>
          <div className={styles.infoTitle}>
            {this.props.title}
          </div>
          <div className={styles.infoSubtitle}>
            {this.props.subtitle}
          </div>
        </div>
      </div>
    );
  }
}

NotificationsButton.propTypes = {
  imgSize: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

NotificationsButton.defaultProps = {
  imgSize: 40,
};

export default NotificationsButton;
