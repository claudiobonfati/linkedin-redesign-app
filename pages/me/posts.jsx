import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import Loading from '../../components/Loading';
import CurrentProfileOverview from '../../components/CurrentProfileOverview';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import SimpleCard from '../../components/SimpleCard';
import { fetchMoreUserPosts, getRandomUsers } from '../../graphql/hooks';
import ProfileDisplay from '../../components/ProfileDisplay';
import NothingFound from '../../components/NothingFound';
import defaultVariants from '../../utils/FramerMotionDefault';

class MePosts extends React.Component {
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
      mostEngaged: [],
    };

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  async componentDidMount() {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    // Request initial posts
    this.fetchPosts();

    // Request "Most engaged" profiles
    this.fetchMostEngaged();
  }

  async fetchPosts() {
    try {
      let result = await fetchMoreUserPosts(
        this.state.feedPage,
        this.state.feedPerPage,
        1,
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
    } catch (e) { }
  }

  async fetchMostEngaged() {
    try {
      let result = await getRandomUsers(4, ['1']);

      this.setState(() => ({
        mostEngaged: result,
      }));
    } catch (e) { }
  }

  render() {
    // Main posts list
    let jsxPostsList = (<Loading />);

    if (this.state.feed.data
    && Array.isArray(this.state.feed.data)) {
      if (this.state.feed.data.length > 0) {
        jsxPostsList = (
          <>
            {this.state.feed.data.map((post, index) => (
              <div className="mb-4" key={post.id}>
                <Post
                  opPhoto={post.User ? post.User.photo : post.Company.logo}
                  opName={post.User ? post.User.name : post.Company.name}
                  opSubtitle={post.User ? post.User.headline : null}
                  opLink="/me/details"
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
      } else {
        jsxPostsList = (
          <div className="mb-4">
            <NothingFound
              title="Yikes... It looks like our server is not responding."
              subtitle="Relax, breath, and try reloading the page."
            />
          </div>
        );
      }
    }

    // "Most engaged" profiles
    let jsxMostEngagedList = (<Loading />);

    if (this.state.mostEngaged
    && Array.isArray(this.state.mostEngaged)
    && this.state.mostEngaged.length > 0) {
      jsxMostEngagedList = (
        <>
          {this.state.mostEngaged.map((profile, index) => (
            <div className={`${index + 1 === this.state.mostEngaged.length ? '' : 'pb-3'}`} key={profile.id}>
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
        <div className="container full-screen">
          <main className="row">
            <div className="col-lg-3 col-md-4 pt-4 d-none d-md-block">
              <div className="sticky-aside-content">
                <Sticky topOffset={-20} scrollElement=".stickyArea">
                  <CurrentProfileOverview />
                </Sticky>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 py-4">
              <div className="mb-4">
                <CreatePost />
              </div>
              {jsxPostsList}
            </div>
            <div className="col-lg-3 col-md-4 py-4 d-none d-lg-block">
              <SimpleCard title="Most engaged">
                {jsxMostEngagedList}
              </SimpleCard>
            </div>
          </main>
        </div>
      </motion.div>
    );
  }
}

export default MePosts;
