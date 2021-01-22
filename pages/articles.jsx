import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import ProfileOverview from '../components/ProfileOverview';
import Post from '../components/Post';
import { fetchMoreArticles } from '../graphql/hooks';

class Articles extends React.Component {
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

    this.fetchArticles = this.fetchArticles.bind(this);
  }

  componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    try {
      let result = await fetchMoreArticles(this.state.feedPage, this.state.feedPerPage);

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
    // Main articles list
    let jsxArticlesList = null;

    if (this.state.feed.data
        && Array.isArray(this.state.feed.data)
        && this.state.feed.data.length > 0) {
      jsxArticlesList = (
        <>
          {this.state.feed.data.map((post, index) => (
            <div className="mb-4" key={post.id}>
              <Post
                opPhoto={post.User ? post.User.photo : post.Company.logo}
                opName={post.User ? post.User.name : post.Company.name}
                opSubtitle={post.User ? post.User.headline : null}
                opLink={post.User ? `/profile/${post.User.username}/details` : `/company/${post.Company.name}`}
                postTime={post.time}
                postTitle={post.title}
                postBody={post.body}
                postBottomLinkText="Read article"
                postBottomLink={post.fullArticle}
                postImage={post.image}
                postVimeo={post.video}
                postLikes={post.likes}
                postComments={post.Comments}
              />
              {(index === this.state.feed.data.length - 1 && !this.state.feedEnded)
              && (
                <Waypoint
                  onEnter={() => (!this.state.feedEnded ? this.fetchArticles() : null)}
                />
              )}
            </div>
          ))}
        </>
      );
    }

    return (
      <div className="container">
        <main className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 pt-4 d-none d-sm-block">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections={658}
                views={35}
                actionMyProfile
              />
            </div>
          </div>
          <div className="col-6 pt-4 d-none d-sm-block d-md-none">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections={658}
                views={35}
                actionMyProfile
                email="claudio@example.com"
                twitter="claudioexample"
                skype="claudioexample"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-9 py-4">
            {jsxArticlesList}
          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections={658}
                views={35}
                actionMyProfile
                email="claudio@example.com"
                twitter="claudioexample"
                skype="claudioexample"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Articles;
