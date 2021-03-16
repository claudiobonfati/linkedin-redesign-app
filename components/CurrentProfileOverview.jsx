import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProfileOverview from './ProfileOverview';
import { getSimpleUser } from '../graphql/hooks';
import SimpleButton from './SimpleButton';
import Loading from './Loading';

const currentProfileOverview = (props) => {
  const profile = useStoreState((state) => state.user.profile);
  const setProfile = useStoreActions((actions) => actions.user.setProfile);

  (async () => {
    if (!profile) {
      let response = await getSimpleUser('claudiobonfati');

      setProfile(response);
    }
  })();

  // Main articles list
  let jsxDisplay = (<Loading />);

  if (profile
  && !profile.error
  && !profile.loading) {
    jsxDisplay = (
      <>
        <ProfileOverview
          photo={profile.data.photo}
          name={profile.data.name}
          position={profile.data.headline}
          connections={profile.data.connections}
          views={653}
          actionMyProfile={props.simple}
          email={!props.simple ? profile.data.email : null}
          twitter={!props.simple ? profile.data.twitter : null}
          skype={!props.simple ? profile.data.skype : null}
        />
        {!props.simple && (
          <SimpleButton
            text="Connect with me"
            to="https://www.linkedin.com/in/claudiobonfati/"
            outside
            noBorderTop
          />
        )}
      </>
    );
  }

  return (
    <>
      {jsxDisplay}
    </>
  );
};

currentProfileOverview.propTypes = {
  simple: PropTypes.bool,
};

currentProfileOverview.defaultProps = {
  simple: false,
};

export default currentProfileOverview;
