import React from 'react';
import PropTypes from 'prop-types';
import styles from './LikeButton.module.sass';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };

    this.likePost = this.likePost.bind(this);
  }

  likePost() {
    this.setState((prevState) => ({
      liked: !prevState.liked,
    }));
  }

  render() {
    return (
      <button
        className={`py-4 ${styles.likeButton} ${this.state.liked ? styles.heartAnimation : ''}`}
        type="button"
        onClick={this.likePost}
      >
        <span className="lnr lnr-heart" />
        <div className={styles.buttonLabel}>
          {this.state.liked ? (this.props.likes + 1) : this.props.likes }
        </div>
      </button>
    );
  }
}

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
};

export default LikeButton;
