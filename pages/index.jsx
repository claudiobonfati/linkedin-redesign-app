import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import CurrentProfileOverview from '../components/CurrentProfileOverview';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { fetchMorePosts } from '../graphql/hooks';
import defaultVariants from '../utils/FramerMotionDefault';

class Home extends React.Component {
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
    };

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  async componentDidMount() {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    this.fetchPosts();
  }

  async fetchPosts() {
    try {
      let result = await fetchMorePosts(this.state.feedPage, this.state.feedPerPage);

      if (!result.loading && !result.error) {
        if (!result.data || result.data.length === 0) {
          this.setState({
            feedEnded: true,
          });
        } else {
          let shuffledResult = result.data.map((x) => x);
          shuffledResult = shuffledResult.sort(() => Math.random() - 0.5);

          this.setState((prevState) => ({
            feed: {
              loading: result.loading,
              error: result.error,
              data: prevState.feed.data.concat(shuffledResult),
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
                opLink={post.User ? `/profile/${post.User.username}/details` : `/company/${post.Company.nameslug}/home`}
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

    return (
      <motion.div
        className="container"
        variants={defaultVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <main className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 pt-4 d-none d-sm-block">
            <div className="sticky-aside-content">
              <Sticky topOffset={-20} scrollElement=".stickyArea">
                <CurrentProfileOverview simple />
              </Sticky>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 py-4">
            <div className="mb-4">
              <CreatePost />
            </div>
            {jsxPostsList}
          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <CurrentProfileOverview simple />
            </div>
          </div>
        </main>
      </motion.div>
    );
  }
}

export default Home;
