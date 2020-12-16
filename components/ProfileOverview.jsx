import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileOverview.module.sass';

class ProfileOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // =)
  }

  render() {
    return (
      <div className={`border-gray ${styles.wrapper}`}>
        <div className={styles.topInfoWrapper}>
          <div className={styles.photoWrapper}>
            <img src={this.props.photo} alt="Profile" />
          </div>
          <div className={styles.name}>
            {this.props.name}
          </div>
          <div className={styles.position}>
            {this.props.position}
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.infoLeft}>
            <div className={`${this.props.views ? styles.fullWidth : ''} ${styles.value}`}>
              {this.props.connections}
            </div>
            <span className={styles.title}>
              Connections
            </span>
          </div>
          { this.props.views
          && (
          <div className={styles.infoRight}>
            <div className={styles.value}>
              {this.props.views}
            </div>
            <span className={styles.title}>
              Views
            </span>
          </div>
          )}
        </div>
        { this.props.actionMyProfile
        && (
          <a href="https://google.com" className={styles.footerAction}>
            View my profile
          </a>
        )}
        { !this.props.actionMyProfile
        && (
          <div className={styles.socialNetworks}>
            { this.props.email
            && (
              <a href="https://google.com" className={styles.item}>
                <span className="lnr lnr-earth" />
                {this.props.email}
              </a>
            )}
            { this.props.twitter
            && (
              <a href="https://google.com" className={styles.item}>
                <span className="lnr lnr-earth" />
                {this.props.twitter}
              </a>
            )}
            { this.props.skype
            && (
              <a href="https://google.com" className={styles.item}>
                <span className="lnr lnr-earth" />
                {this.props.skype}
              </a>
            )}
          </div>
        )}
      </div>
    );
  }
}

ProfileOverview.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  connections: PropTypes.number.isRequired,
  views: PropTypes.number,
  actionMyProfile: PropTypes.bool,
  email: PropTypes.string,
  twitter: PropTypes.string,
  skype: PropTypes.string,
};

ProfileOverview.defaultProps = {
  actionMyProfile: false,
  views: null,
  email: null,
  twitter: null,
  skype: null,
};

export default ProfileOverview;
