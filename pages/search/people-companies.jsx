import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'next/router';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import Loading from '../../components/Loading';
import SimpleCard from '../../components/SimpleCard';
import CurrentProfileOverview from '../../components/CurrentProfileOverview';
import ProfileDisplay from '../../components/ProfileDisplay';
import { useSearchUsersCompanies } from '../../graphql/hooks';
import defaultVariants from '../../utils/FramerMotionDefault';
import NothingFound from '../../components/NothingFound';

const searchAll = (props) => {
  const { keywords } = props.router.query;
  const result = useSearchUsersCompanies(keywords, 0, 30);

  let jsxContactsList = null;
  let jsxCompaniesList = null;
  let jsxNothingFound = null;
  let jsxLoading = null;

  if (result.loading) {
    jsxLoading = (
      <Loading />
    );
  } else if (result
  && !result.error) { // Check if useSearchUsersCompanies hook is complete
    if (result.data.allUsers
    && result.data.allUsers.length > 0) { // Check if Users array exists
      jsxContactsList = (
        <>
          {result.data.allUsers.map((contact, index) => (
            <div
              className={`
                ${(index < result.data.allUsers.length - 1) ? 'border-bottom-gray' : 'pb-0'} 
                ${(index === 0) ? 'pb-3' : ' py-3'}
              `}
              key={contact.id}
            >
              <ProfileDisplay
                link={`/profile/${contact.username}/details`}
                image={contact.photo}
                imageSize={60}
                title={contact.name}
                subtitle={contact.headline}
                rightButtonText="View profile"
                rightButtonLink={`/profile/${contact.username}/details`}
              />
            </div>
          ))}
        </>
      );
    }
    if (result.data.allCompanies
    && result.data.allCompanies.length > 0) { // Check if Companies array exists
      jsxCompaniesList = (
        <>
          {result.data.allCompanies.map((company, index) => (
            <div
              className={`
                ${(index < result.data.allCompanies.length - 1) ? 'border-bottom-gray' : 'pb-0'} 
                ${(index === 0) ? 'pb-3' : ' py-3'}
              `}
              key={company.id}
            >
              <ProfileDisplay
                link={`/company/${company.nameslug}/home`}
                image={company.logo}
                imageSize={60}
                title={company.name}
                subtitle={company.headquarters}
              />
            </div>
          ))}
        </>
      );
    }
    if (result.data.allUsers.length === 0
    && result.data.allCompanies.length === 0) {
      jsxNothingFound = (
        <NothingFound
          title="Sorry, but nothing matched your search criteria."
          subtitle="Try using differents keywords."
        />
      );
    }
  }

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
          <div className="col-lg-3 col-md-4 pt-4 d-none d-lg-block">
            <div className="sticky-aside-content">
              <Sticky topOffset={-20} scrollElement=".stickyArea">
                <CurrentProfileOverview simple />
              </Sticky>
            </div>
          </div>
          <div className="col-lg-9 col-md-8 py-4">
            {jsxLoading && (
              <div className="mb-4">
                {jsxLoading}
              </div>
            )}
            {jsxNothingFound && (
              <div className="mb-4">
                {jsxNothingFound}
              </div>
            )}
            {jsxContactsList && (
              <div className="mb-4">
                <SimpleCard
                  title="People"
                  rightText={`${result.data.allUsers.length} ${result.data.allUsers.length > 1 ? 'results' : 'result'}`}
                >
                  {jsxContactsList}
                </SimpleCard>
              </div>
            )}
            {jsxCompaniesList && (
              <div className="mb-4">
                <SimpleCard
                  title="Companies"
                  rightText={`${result.data.allCompanies.length} ${result.data.allCompanies.length > 1 ? 'results' : 'result'}`}
                >
                  {jsxCompaniesList}
                </SimpleCard>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default withRouter(React.memo(searchAll, () => true));
