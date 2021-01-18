import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import ReactHtmlParser from 'react-html-parser';
import styles from './Post.module.sass';
import ProfileDisplay from './ProfileDisplay';
import LikeButton from './LikeButton';

class Post extends React.Component {
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
      <div className={styles.wrapper}>
        <div className="px-4">
          <div className={`py-4 ${styles.header}`}>
            <ProfileDisplay
              link={this.props.opLink}
              image={this.props.opPhoto}
              imageSize={60}
              title={this.props.opName}
              subtitle={this.props.opSubtitle}
              sideContent={this.props.postTime}
            />
          </div>
          <section className={`py-4 ${styles.content} ${styles.withMedia}`}>
            {(this.props.postTitle)
            && (
              <h3 className="h5 mb-3 color-gray-dark">{this.props.postTitle}</h3>
            )}
            <p>{ReactHtmlParser(this.props.postBody)}</p>
            {(this.props.postImage || this.props.postVimeo)
            && (
              <div className={`${styles.contentMedia}`}>
                { this.props.postImage
                && (
                  <img
                    src={this.props.postImage}
                    alt="Post banner"
                  />
                )}
                {this.props.postVimeo
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
                      volume={0}
                      muted
                    />
                  </div>
                )}
              </div>
            )}
            {this.props.postBottomLink
            && (
              <div className={styles.bottomLinkWrapper}>
                <Link href={this.props.postBottomLink}>
                  <a target="_blank">{this.props.postBottomLinkText ? this.props.postBottomLinkText : 'Read more'}</a>
                </Link>
              </div>
            )}
          </section>
          <div className={`${styles.footer}`}>
            <LikeButton likes={this.props.postLikes} />
            {(Array.isArray(this.props.postComments) && this.props.postComments.length > 0)
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
              <div className={`py-4 ${styles.commentItem}`} key={comment.id}>
                <ProfileDisplay
                  link={`/profile/${comment.User.username}/details`}
                  image={comment.User.photo}
                  imageOnTop
                  imageSize={40}
                  title={comment.User.name}
                  subtitle={comment.body}
                  sideContent={comment.time}
                  sideContentOnTop
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
  opSubtitle: PropTypes.string,
  opLink: PropTypes.string,
  postTime: PropTypes.string.isRequired,
  postBottomLinkText: PropTypes.string,
  postBottomLink: PropTypes.string,
  postTitle: PropTypes.string,
  postBody: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  postVimeo: PropTypes.number,
  postLikes: PropTypes.number.isRequired,
  postComments: PropTypes.array,
};

Post.defaultProps = {
  opLink: null,
  opSubtitle: null,
  postImage: null,
  postVimeo: null,
  postComments: null,
  postTitle: null,
  postBottomLinkText: null,
  postBottomLink: null,
};

export default Post;
