import React, { Fragment, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import SimpleCard from '../../components/SimpleCard';
import FormAddDetail from '../../components/FormAddDetail';
import Polaroid from '../../components/Polaroid';
import CurrentProfileOverview from '../../components/CurrentProfileOverview';
import ProfileDisplay from '../../components/ProfileDisplay';
import { useUser } from '../../graphql/hooks';
import defaultVariants from '../../utils/FramerMotionDefault';

function MeImprove() {
  const user = useUser('claudiobonfati');

  useEffect(() => {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);
  }, []);

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
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <Sticky topOffset={-20} scrollElement=".stickyArea">
                <CurrentProfileOverview />
              </Sticky>
            </div>
          </div>
          <div className="col-lg-6 py-4">
            <div className="mb-4">
              <FormAddDetail
                title="Add volunteering experience"
                subtitle="1 in 5 manager hired someone becouse of that"
                color="green"
                button="Save experience"
              />
            </div>
            <div className="mb-4">
              <FormAddDetail
                title="Add volunteering opportunities"
                subtitle="Non profit organizations could be looking for you"
                color="yellow"
                button="Create opportunity"
              />
            </div>
            <div className="mb-4">
              <SimpleCard title="Summary">
                {(user
                && !user.error
                && !user.loading)
                && (
                  <p>{user.data.summary}</p>
                )}
              </SimpleCard>
            </div>
            {(user
            && !user.error
            && !user.loading
            && user.data.Experiences)
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
                          title={item.title}
                          blueLine={item.Company.name}
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
            && !user.error
            && !user.loading
            && user.data.Courses)
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
            && !user.error
            && !user.loading
            && user.data.Recommendations)
            && (
              <div className="mb-4">
                <SimpleCard title="Recommendations">
                  {user.data.Recommendations.map((item, index) => (
                    <div className={`p-3 border-gray bg-gray-lighter ${index + 1 !== user.data.Recommendations.length ? 'mb-4' : ''}`} key={item.id}>
                      <ProfileDisplay
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
            && !user.error
            && !user.loading
            && user.data.Follows)
            && (
              <div className="mb-4">
                <SimpleCard title="Following">
                  <div className="row">
                    {user.data.Follows.map((item) => (
                      <div className="col-lg-4 col-sm-3 col-6 mb-3 mb-sm-0" key={item.id}>
                        <Polaroid
                          image={item.Company.cover}
                          title={item.Company.name}
                        />
                      </div>
                    ))}
                  </div>
                </SimpleCard>
              </div>
            )}
          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <SimpleCard title="Keep in touch">
              {(user
              && !user.error
              && !user.loading)
              && (
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
                </div>
              )}
            </SimpleCard>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default MeImprove;
