import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'next/router';
import { motion } from 'framer-motion';
import SimpleCard from '../../../components/SimpleCard';
import Polaroid from '../../../components/Polaroid';
import ProfileOverview from '../../../components/ProfileOverview';
import ProfileDisplay from '../../../components/ProfileDisplay';
import { useUser } from '../../../graphql/hooks';
import defaultVariants from '../../../utils/FramerMotionDefault';

const checkRouterRerender = (prevProps, nextProps) => {
  if (!nextProps.router?.query?.username) {
    return true;
  }
  return false;
};

const profileDetails = (props) => {
  const { username } = props.router.query;
  const user = useUser(username);

  useEffect(() => {
    // Resetins scroll manually (FramerMotion)
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="container"
      variants={defaultVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <main className="row">
        <div className="col-lg-3 col-md-4 pt-4">
          <div className="sticky-aside-content">
            {(user
            && user.data
            && !user.error
            && !user.loading)
            && (
              <ProfileOverview
                photo={user.data.photo}
                name={user.data.name}
                position={user.data.headline}
                connections={658}
                views={35}
                email={user.data.email}
                twitter={user.data.twitter}
                skype={user.data.skype}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6 col-md-8 py-4">
          {(user
          && user.data
          && !user.error
          && !user.loading)
          && (
            <div className="mb-4">
              <SimpleCard title="Summary">
                <p>{user.data.summary}</p>
              </SimpleCard>
            </div>
          )}
          {(user
          && user.data
          && !user.error
          && !user.loading
          && user.data.Experiences
          && user.data.Experiences.length > 0)
          && (
            <div className="mb-4">
              <SimpleCard title="Experience">
                {user.data.Experiences.map((item, index) => (
                  <Fragment key={item.id}>
                    <div className="mb-2">
                      <ProfileDisplay
                        link={`/company/${item.Company.nameslug}/home`}
                        image={item.Company.logo}
                        imageSize={45}
                        imageSide="right"
                        title={item.Company.name}
                        blueLine={item.title}
                        subtitle={item.period}
                      />
                    </div>
                    <div className={index + 1 !== user.data.Experiences.length ? 'mb-4' : ''}>
                      <p>
                        {item.description}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </SimpleCard>
            </div>
          )}
          {(user
          && user.data
          && !user.error
          && !user.loading
          && user.data.Courses
          && user.data.Courses.length > 0)
          && (
            <div className="mb-4">
              <SimpleCard title="Education">
                {user.data.Courses.map((item, index) => (
                  <Fragment key={item.id}>
                    <div className="mb-2">
                      <ProfileDisplay
                        link={`/company/${item.Company.nameslug}/home`}
                        image={item.Company.logo}
                        imageSize={45}
                        imageSide="right"
                        title={item.Company.name}
                        blueLine={item.title}
                        subtitle={item.period}
                      />
                    </div>
                    <div className={index + 1 !== user.data.Courses.length ? 'mb-4' : ''}>
                      <p>
                        {item.description}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </SimpleCard>
            </div>
          )}
          {(user
          && user.data
          && !user.error
          && !user.loading
          && user.data.Recommendations
          && user.data.Recommendations.length > 0)
          && (
            <div className="mb-4">
              <SimpleCard title="Recommendations">
                {user.data.Recommendations.map((item, index) => (
                  <div className={`p-3 border-gray bg-gray-lighter ${index + 1 !== user.data.Recommendations.length ? 'mb-4' : ''}`} key={item.id}>
                    <ProfileDisplay
                      link={`/profile/${item.Author.username}/details`}
                      image={item.Author.photo}
                      imageSize={47}
                      title={item.Author.name}
                      subtitle={item.Author.headline}
                    />
                    <p className="pl-5 ml-3 mt-3">
                      {item.description}
                    </p>
                  </div>
                ))}
              </SimpleCard>
            </div>
          )}
          {(user
          && user.data
          && !user.error
          && !user.loading
          && user.data.Follows
          && user.data.Follows.length > 0)
          && (
            <div>
              <SimpleCard title="Following">
                <div className="row">
                  {user.data.Follows.map((item) => (
                    <div className="col-lg-4 col-sm-3 col-6 mb-4" key={item.id}>
                      <Polaroid
                        image={item.Company.cover}
                        title={item.Company.name}
                        link={`/company/${item.Company.nameslug}/home`}
                      />
                    </div>
                  ))}
                </div>
              </SimpleCard>
            </div>
          )}
        </div>
        <div className="col-lg-3 col-md-4 py-4 d-none d-lg-block">
          <SimpleCard title="Keep in touch">
            <div className="w-100">
              <div className="pb-3">
                <ProfileDisplay
                  image="/images/me.jpg"
                  imageSize={50}
                  title="Jenson Kent"
                  subtitle="CEO and founder"
                />
              </div>
              <div className="py-3">
                <ProfileDisplay
                  image="/images/me.jpg"
                  imageSize={50}
                  title="Emily Kilimanjaro"
                  subtitle="UI designer"
                />
              </div>
              <div className="py-3">
                <ProfileDisplay
                  image="/images/me.jpg"
                  imageSize={50}
                  title="James Johns"
                  subtitle="Project manager"
                />
              </div>
              <div className="pt-3">
                <ProfileDisplay
                  image="/images/me.jpg"
                  imageSize={50}
                  title="CTO"
                  subtitle="is now a connection"
                />
              </div>
            </div>
          </SimpleCard>
        </div>
      </main>
    </motion.div>
  );
};

export default withRouter(React.memo(profileDetails, checkRouterRerender));
