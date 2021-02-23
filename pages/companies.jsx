import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import CurrentProfileOverview from '../components/CurrentProfileOverview';
import Post from '../components/Post';
import NothingFound from '../components/NothingFound';
import { fetchMoreCompaniesPosts } from '../graphql/hooks';
import defaultVariants from '../utils/FramerMotionDefault';

class Companies extends React.Component {
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

  componentDidMount() {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    this.fetchPosts();
  }

  async fetchPosts() {
    try {
      let result = await fetchMoreCompaniesPosts(this.state.feedPage, this.state.feedPerPage);

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
                opLink={`/company/${post.Company.nameslug}/home`}
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
    } else if (
      (this.state.feed.data
      && Array.isArray(this.state.feed.data)
      && this.state.feed.data.length === 0)
      ||
      (this.state.feed.error)
    ) {
      jsxPostsList = (
        <div className="mb-4">
          <NothingFound 
            title="Yikes... It looks like our server is not responding."
            subtitle="Relax, breath, and try reloading the page."
          />
        </div>
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
            <div className="col-lg-3 col-md-3 col-sm-6 pt-4 d-none d-md-block">
              <div className="sticky-aside-content">
                <Sticky topOffset={-20} scrollElement=".stickyArea">
                  <CurrentProfileOverview simple />
                </Sticky>
              </div>
            </div>
            <div className="col-lg-6 col-md-9 py-4">
              {jsxPostsList}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 pt-4 d-none d-md-block">
              <div className="sticky-aside-content">
                <Sticky topOffset={-20} scrollElement=".stickyArea">
                  <CurrentProfileOverview simple />
                </Sticky>
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    );
  }
}

export default Companies;
