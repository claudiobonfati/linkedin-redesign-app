import React, { Fragment } from 'react';
import Router from 'next/router';
import { Waypoint } from 'react-waypoint';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import Loading from '../../components/Loading';
import CurrentProfileOverview from '../../components/CurrentProfileOverview';
import NothingFound from '../../components/NothingFound';
import SimpleCard from '../../components/SimpleCard';
import ProfileDisplay from '../../components/ProfileDisplay';
import Post from '../../components/Post';
import { fetchMoreSearchPosts, getRandomCompanies } from '../../graphql/hooks';
import defaultVariants from '../../utils/FramerMotionDefault';

class SearchPosts extends React.Component {
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
      recentlyViewed: []
    };

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    // Request posts
    this.fetchPosts();

    // Request "recently viewed" companies
    this.fetchRecentlyViewed();
  }

  async fetchPosts() {
    try {
      let result = await fetchMoreSearchPosts(
        this.state.feedPage, 
        this.state.feedPerPage,
        Router?.query?.keywords,
      );

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
    } catch (e) { }
  }

  async fetchRecentlyViewed() {
    try {
      let result = await getRandomCompanies(4);

      this.setState(() => ({
        recentlyViewed: result,
      }));
    } catch (e) { }
  }

  render() {
    // Main posts list
    let jsxPostsList = (<Loading />);

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
                <>
                  <Loading />
                  <Waypoint
                    onEnter={() => (!this.state.feedEnded ? this.fetchPosts() : null)}
                  />
                </>
              )}
            </div>
          ))}
        </>
      );
    }

    // "Recently viewed" companies
    let jsxRecentlyViewed = (<Loading />);

    if (this.state.recentlyViewed
    && Array.isArray(this.state.recentlyViewed)
    && this.state.recentlyViewed.length > 0) {
      jsxRecentlyViewed = (
        <>
          {this.state.recentlyViewed.map((company, index) => (
            <div className={`${index + 1 === this.state.recentlyViewed.length ? '' : 'pb-3'}`} key={company.id}>
              <ProfileDisplay
                image={company.logo}
                imageSize={50}
                title={company.name}
                subtitle={company.industry}
                link={`/company/${company.nameslug}/home`}
                imageOnTop
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
                  <SimpleCard title="Recently viewed">
                    <div className="w-100">
                      {jsxRecentlyViewed}
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


export default SearchPosts;
