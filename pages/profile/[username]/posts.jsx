import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import { withRouter } from 'next/router';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import ProfileOverview from '../../../components/ProfileOverview';
import Post from '../../../components/Post';
import SimpleCard from '../../../components/SimpleCard';
import { fetchMoreUserPosts, getSimpleUser, getRandomUsers } from '../../../graphql/hooks';
import ProfileDisplay from '../../../components/ProfileDisplay';
import defaultVariants from '../../../utils/FramerMotionDefault';

class ProfilePosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedPage: 0,
      feedPerPage: 5,
      feedEnded: false,
      feed: {
        loading: false,
        error: false,
        data: [],
      },
      user: null,
      keepInTouch: []
    };

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  async componentDidMount() {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    // Request initial feed
    if (this.props.router.query.username) {
      this.getInitialPosts();
    }

    // Request "keep in touch" profiles
    this.fetchKeepInTouch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.query.username !== prevProps.router.query.username 
    && this.props.router.query.username !== undefined) {
      this.getInitialPosts();
    }
  }

  async fetchKeepInTouch() {
    try {
      let result = await getRandomUsers(4);

      this.setState(() => ({
        keepInTouch: result,
      }));
    } catch (e) { }
  }

  async getInitialPosts() {
    let userData = await getSimpleUser(this.props.router.query.username);

    this.setState({
      user: userData,
    });

    this.fetchPosts();
  }

  async fetchPosts() {
    try {
      let result = await fetchMoreUserPosts(
        this.state.feedPage,
        this.state.feedPerPage,
        this.state.user.data.id,
      );

      if (!result.loading && !result.error) {
        if (!result.data || result.data.length === 0) {
          this.setState({
            feedEnded: true,
          });
        } else {
          this.setState((prevState) => ({
            feed: {
              loading: result.loading,
              error: result.error,
              data: prevState.feed.data.concat(result.data),
            },
            feedPage: prevState.feedPage + 1,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    // Main posts list
    let jsxPostsList = null;

    if (this.state.feed.data
        && Array.isArray(this.state.feed.data)
        && this.state.feed.data.length > 0) {
      jsxPostsList = (
        <>
          {this.state.feed.data.map((post, index) => (
            <div className="mb-4" key={post.id}>
              <Post
                opPhoto={post.User ? post.User.photo : post.Company.logo}
                opName={post.User ? post.User.name : post.Company.name}
                opSubtitle={post.User ? post.User.headline : null}
                opLink={`/profile/${post.User.username}/details`}
                postTime={post.time}
                postBody={post.body}
                postImage={post.image}
                postVimeo={post.video}
                postLikes={post.likes}
                postComments={post.Comments}
              />
              {(index === this.state.feed.data.length - 1 && !this.state.feedEnded) && (
                <Waypoint
                  onEnter={() => (!this.state.feedEnded ? this.fetchPosts() : null)}
                />
              )}
            </div>
          ))}
        </>
      );
    }

    // "Keep in touch" profiles
    let jsxKeepInTouchList = null;

    if (this.state.keepInTouch
        && Array.isArray(this.state.keepInTouch)
        && this.state.keepInTouch.length > 0) {
      jsxKeepInTouchList = (
        <>
          {this.state.keepInTouch.map((profile, index) => (
            <div className={`${index + 1 === this.state.keepInTouch.length ? '' : 'pb-3'}`} key={profile.id}>
              <ProfileDisplay
                image={profile.photo}
                imageSize={50}
                title={profile.name}
                subtitle={profile.headline}
                link={`/profile/${profile.username}/details`}
              />
            </div>
          ))}
        </>
      );
    }

    return (
      <motion.div
        className="w-100"
        variants={defaultVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container">
          <main className="row">
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div className="sticky-aside-content">
                {(this.state.user
                && !this.state.user.error
                && !this.state.user.loading)
                && (
                  <Sticky topOffset={-20} scrollElement=".stickyArea">
                    <ProfileOverview
                      pro={this.state.user.data.pro}
                      photo={this.state.user.data.photo}
                      name={this.state.user.data.name}
                      position={this.state.user.data.headline}
                      connections={this.state.user.data.connections}
                      email={this.state.user.data.email}
                      twitter={this.state.user.data.twitter}
                      skype={this.state.user.data.skype}
                    />
                  </Sticky>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-8 py-4">
              {jsxPostsList}
            </div>
            <div className="col-lg-3 col-md-4 pt-4 d-none d-md-block">
              <div className="sticky-aside-content">
                <Sticky topOffset={-20} scrollElement=".stickyArea">
                  <SimpleCard title="Keep in touch">
                    <div className="w-100">
                      {jsxKeepInTouchList}
                    </div>
                  </SimpleCard>
                </Sticky>
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(ProfilePosts);
