import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileOverview from './ProfileOverview';
import { getSimpleUser } from '../graphql/hooks';
import SimpleButton from './SimpleButton';

class CurrentProfileOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const oldUser = JSON.parse(localStorage.getItem('current-user-preview'));

    if (oldUser) {
      this.setState({
        user: oldUser,
      });
    } else {
      let userData = await getSimpleUser('claudiobonfati');

      this.setState({
        user: userData,
      });

      localStorage.setItem('current-user-preview', JSON.stringify(userData));
    }
  }

  render() {
    return (
      <>
        {(this.state.user && !this.state.user.error && !this.state.user.loading)
        && (
          <>
            <ProfileOverview
              photo={this.state.user.data.photo}
              name={this.state.user.data.name}
              position={this.state.user.data.headline}
              connections={this.state.user.data.connections}
              views={653}
              actionMyProfile={this.props.simple}
              email={!this.props.simple ? this.state.user.data.email : null}
              twitter={!this.props.simple ? this.state.user.data.twitter : null}
              skype={!this.props.simple ? this.state.user.data.skype : null}
            />
            {!this.props.simple
            && (
              <div className="mt-4">
                <SimpleButton
                  text="Connect with me"
                  to="https://www.linkedin.com/in/claudiobonfati/"
                  outside
                />
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

CurrentProfileOverview.propTypes = {
  simple: PropTypes.bool,
};

CurrentProfileOverview.defaultProps = {
  simple: false,
};

export default CurrentProfileOverview;
