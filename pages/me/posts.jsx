import React, { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import ProfileOverview from '../../components/ProfileOverview';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import { fetchMoreUserPosts, getSimpleUser } from '../../graphql/hooks';

class MeDetails extends React.Component {
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
    };

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  async componentDidMount() {
    this.fetchPosts();
    let userData = await getSimpleUser(1);

    this.setState({
      user: userData,
    });
  }

  fetchPosts() {
    fetchMoreUserPosts(
      this.state.feedPage,
      this.state.feedPerPage,
      1,
    ).then((result) => {
      if (!result.loading) {
        if (!result || result.data.length === 0) {
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
          }));
        }
      }
    });

    this.setState((prevState) => ({
      feedPage: prevState.feedPage + 1,
    }));
  }

  render() {
    return (
      <>
        <div className="container">
          <main className="row">
            <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
              <div className="sticky-aside-content">
                {(this.state.user && !this.state.user.error && !this.state.user.loading)
                && (
                  <ProfileOverview
                    photo={this.state.user.data.photo}
                    name={this.state.user.data.name}
                    position={this.state.user.data.headline}
                    connections={658}
                    views={35}
                    email={this.state.user.data.email}
                    twitter={this.state.user.data.twitter}
                    skype={this.state.user.data.skype}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-9 py-4">
              <div className="mb-4">
                <CreatePost />
              </div>
              {(this.state.feed.data
              && Array.isArray(this.state.feed.data)
              && this.state.feed.data.length > 0)
              && (
                <>
                  {this.state.feed.data.map((post, index) => (
                    <div className="mb-4" key={`${post.id}`}>
                      <Post
                        opPhoto={post.User ? post.User.photo : post.Company.logo}
                        opName={post.User ? post.User.name : post.Company.name}
                        opSubtitle={post.User ? post.User.headline : null}
                        opLink="https://google.com"
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
              )}
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
      </>
    );
  }
}

export default MeDetails;