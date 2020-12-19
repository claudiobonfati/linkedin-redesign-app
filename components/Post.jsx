import React from 'react';
import PropTypes from 'prop-types';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import styles from './Post.module.sass';
import ProfileDisplay from './ProfileDisplay';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };

    this.likePost = this.likePost.bind(this);
  }

  componentDidMount() {
    console.log(this.props.postComments);
  }

  likePost() {
    this.setState((prevState) => ({
      liked: !prevState.liked,
    }));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className="px-4">
          <div className={`py-4 ${styles.header}`}>
            <ProfileDisplay
              image={this.props.opPhoto}
              imageSize={60}
              title={this.props.opName}
              subtitle={this.props.opSubtitle}
              rightContent={this.props.postTime}
            />
          </div>
          <div className={`py-4 ${styles.content} ${styles.withMedia}`}>
            <p>{this.props.postBody}</p>
            { (this.props.postImage || this.props.postVimeo)
            && (
              <div className={`${styles.contentMedia}`}>
                { this.props.postImage
                && (
                  <img
                    src={this.props.postImage}
                    alt="Post banner"
                  />
                )}
                { this.props.postVimeo
                && (
                  <div className={styles.playerWrapper}>
                    <Plyr
                      ref={(ref) => { this.plyrRef = ref; }}
                      source={{
                        type: 'video',
                        sources: [
                          {
                            src: this.props.postVimeo,
                            provider: 'vimeo',
                          },
                        ],
                      }}
                      autoPlay
                      volume={0}
                      muted
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={`${styles.footer}`}>
            <button
              className={`py-4 ${styles.footerInfo} ${styles.loveButton} ${this.state.liked ? styles.heartAnimation : styles.reverseHeartAnimation}`}
              type="button"
              onClick={this.likePost}
            >
              <span className="lnr lnr-heart" />
              <div className={styles.buttonLabel}>
                {this.state.liked ? (this.props.postLikes + 1) : this.props.postLikes }
              </div>
            </button>
            { (Array.isArray(this.props.postComments) && this.props.postComments.length > 0)
            && (
              <div className={`py-4 pl-3 ${styles.footerInfo}`}>
                <span className="lnr lnr-bubble" />
                <div className={styles.buttonLabel}>
                  {this.props.postComments.length}
                </div>
              </div>
            )}
          </div>
        </div>
        {(Array.isArray(this.props.postComments) && this.props.postComments.length > 0)
        && (
          <div className={`px-4 ${styles.commentsSection}`}>
            {this.props.postComments.map((comment) => (
              <div className={`py-4 ${styles.commentItem}`}>
                <ProfileDisplay
                  key={comment.id}
                  image={comment.User.photo}
                  imageOnTop
                  imageSize={40}
                  title={comment.User.name}
                  subtitle={comment.body}
                  rightContent={comment.time}
                  rightContentOnTop
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Post.propTypes = {
  opPhoto: PropTypes.string.isRequired,
  opName: PropTypes.string.isRequired,
  opSubtitle: PropTypes.string.isRequired,
  opLink: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  postBody: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  postVimeo: PropTypes.string,
  postLikes: PropTypes.string.isRequired,
  postComments: PropTypes.array,
};

Post.defaultProps = {
  postImage: null,
  postVimeo: null,
  postComments: null,
};

export default Post;
