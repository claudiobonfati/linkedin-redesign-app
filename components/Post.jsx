import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import ReactHtmlParser from 'react-html-parser';
import { Image } from 'react-image-and-background-image-fade';
import FeatherIcon from 'feather-icons-react';
import styles from './Post.module.sass';
import ProfileDisplay from './ProfileDisplay';
import LikeButton from './LikeButton';

const post = (props) => (
  <div className={`${styles.wrapper} ${props.noBorder ? styles.noBorder : ''}`}>
    <div className={`${!props.noPadding ? 'px-4' : ''}`}>
      {props.opPhoto
        && props.opName
        && (
          <div className={`${!props.noPadding ? 'py-4' : ''} ${styles.header}`}>
            <ProfileDisplay
              link={props.opLink}
              image={props.opPhoto}
              imageSize={60}
              title={props.opName}
              subtitle={props.opSubtitle}
              sideContent={props.postTime}
            />
          </div>
        )}
      <section className={`${!props.noPadding ? 'py-4' : ''} ${styles.content} ${styles.withMedia}`}>
        {(props.postTitle)
        && (
          <h3 className="h5 mb-3 color-gray-dark">{props.postTitle}</h3>
        )}
        <p>{ReactHtmlParser(props.postBody)}</p>
        {(props.postImage || props.postVimeo)
        && (
          <div className={`${styles.contentMedia}`}>
            {props.postImage
            && (
              <Image
                src={props.postImage}
                alt="Post banner"
              />
            )}
            {props.postVimeo
            && (
              <div className={styles.playerWrapper}>
                <Plyr
                  source={{
                    type: 'video',
                    sources: [
                      {
                        src: props.postVimeo,
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
        {props.postBottomLink
        && (
          <div className={styles.bottomLinkWrapper}>
            <Link href={props.postBottomLink}>
              <a target="_blank">{props.postBottomLinkText ? props.postBottomLinkText : 'Read more'}</a>
            </Link>
          </div>
        )}
      </section>
      <div className={`${styles.footer}`}>
        <LikeButton likes={props.postLikes} />
        {(Array.isArray(props.postComments) && props.postComments.length > 0)
        && (
          <div className={`py-4 pl-3 ${styles.footerInfo}`}>
            <FeatherIcon icon="message-square" size="20" strokeWidth="1.2" />
            <div className={styles.buttonLabel}>
              {props.postComments.length}
            </div>
          </div>
        )}
      </div>
    </div>
    {(Array.isArray(props.postComments) && props.postComments.length > 0)
    && (
      <div className={`${!props.noPadding ? 'px-4' : ''} ${styles.commentsSection}`}>
        {props.postComments.map((comment) => (
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

post.propTypes = {
  opPhoto: PropTypes.string,
  opName: PropTypes.string,
  opSubtitle: PropTypes.string,
  opLink: PropTypes.string,
  postTime: PropTypes.string,
  postBottomLinkText: PropTypes.string,
  postBottomLink: PropTypes.string,
  postTitle: PropTypes.string,
  postBody: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  postVimeo: PropTypes.number,
  postLikes: PropTypes.number.isRequired,
  postComments: PropTypes.array,
  noPadding: PropTypes.bool,
  noBorder: PropTypes.bool,
};

post.defaultProps = {
  opPhoto: null,
  opName: null,
  opLink: null,
  opSubtitle: null,
  postTime: null,
  postImage: null,
  postVimeo: null,
  postComments: null,
  postTitle: null,
  postBottomLinkText: null,
  postBottomLink: null,
  noPadding: false,
  noBorder: false,
};

export default post;
