import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import ReactHtmlParser from 'react-html-parser';
import Loading from '../../../components/Loading';
import SimpleCard from '../../../components/SimpleCard';
import Jumbotron from '../../../components/Jumbotron';
import Post from '../../../components/Post';
import ProfileDisplay from '../../../components/ProfileDisplay';
import { useCompany, getRandomCompanies } from '../../../graphql/hooks';
import defaultVariants from '../../../utils/FramerMotionDefault';

const companyHome = (props) => {
  const { nameslug } = props.router.query;
  const company = useCompany(nameslug);
  const [alsoViewed, setAlsoViewed] = useState([]);

  useEffect(async () => {
    // Reseting scroll manually (FramerMotion dependency)
    window.scrollTo(0, 0);

    // Request "People also viewed" list
    const companies = await getRandomCompanies(4, [`${company?.data?.id || '0'}`]);
    setAlsoViewed(companies);
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
          <div className="col-12 pt-4">
            {(company
            && !company.error
            && !company.loading)
            && (
              <Jumbotron
                cover={company.data.cover}
                profileImage={company.data.logo}
                profileName={company.data.name}
                profileSubtitle={company.data.industry}
                leftTitle={company.data.employees.toString()}
                leftSubtitle="Employees"
                rightTitle={company.data.followers.toString()}
                rightSubtitle="Followers"
                leftButtonLink={company.data.website}
                leftButtonText="Visit website"
              />
            )}
          </div>
          <div className="col-lg-3 col-md-4 pt-4">
            <div className="sticky-aside-content">
              <Sticky topOffset={-20} scrollElement=".stickyArea">
                <SimpleCard title="About" noContentPadding>
                  {(company
                  && !company.error
                  && company.loading)
                  && (
                    <Loading />
                  )}
                  {(company
                  && !company.error
                  && !company.loading)
                  && (
                    <>
                      <div>
                        {company.data.industry && (
                          <p className="pb-2">
                            Indutry
                            <br />
                            <strong className="color-gray-dark">{company.data.industry}</strong>
                          </p>
                        )}
                        {company.data.founded && (
                          <p className="pb-2">
                            Founded
                            <br />
                            <strong className="color-gray-dark">{company.data.founded}</strong>
                          </p>
                        )}
                        {company.data.headquarters && (
                          <p className="m-0">
                            Headquarters
                            <br />
                            <strong className="color-gray-dark">{company.data.headquarters}</strong>
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </SimpleCard>
              </Sticky>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 py-4">
            {(company
            && !company.error
            && company.loading)
            && (
              <Loading />
            )}
            {(company
            && !company.error
            && !company.loading)
            && (
              <>
                <div className="mb-4">
                  <SimpleCard title="Description">
                    <p className="m-0">{ReactHtmlParser(company.data.description)}</p>
                  </SimpleCard>
                </div>
                {(company.data.Posts
                && Array.isArray(company.data.Posts)
                && company.data.Posts.length > 0)
                && (
                  <div className="mb-4">
                    {company.data.Posts.map((post, index) => (
                      <SimpleCard
                        key={post.id}
                        title={`${index === 0 ? 'Recent updates' : ''}`}
                        noBorderTop={index > 0}
                        noPaddingBottom
                      >
                        <Post
                          postBody={`<b class="color-gray-dark"> ${post.time} - </b> ${post.body}`}
                          postImage={post.image}
                          postVimeo={post.video}
                          postLikes={post.likes}
                          postComments={post.Comments}
                          noPadding
                          noBorder
                        />
                      </SimpleCard>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-lg-block">
            <div className="sticky-aside-content">
              <Sticky topOffset={-20} scrollElement=".stickyArea">
                <SimpleCard title="People also viewed">
                  {alsoViewed.length === 0 && (
                    <Loading />
                  )}
                  {(Array.isArray(alsoViewed)
                  && alsoViewed.length > 0)
                  && (
                    <div className="w-100">
                      {alsoViewed.map((item, index) => (
                        <div className={`${index + 1 === alsoViewed.length ? '' : 'pb-3'}`} key={item.id}>
                          <ProfileDisplay
                            image={item.logo}
                            imageSize={50}
                            title={item.name}
                            subtitle={item.industry}
                            link={`/company/${item.nameslug}/home`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </SimpleCard>
              </Sticky>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default withRouter(React.memo(companyHome, () => true));
