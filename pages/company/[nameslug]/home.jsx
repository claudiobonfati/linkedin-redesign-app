import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';
import SimpleCard from '../../../components/SimpleCard';
import Jumbotron from '../../../components/Jumbotron';
import Post from '../../../components/Post';
import ProfileDisplay from '../../../components/ProfileDisplay';
import { useCompany } from '../../../graphql/hooks';

const companyHome = () => {
  const router = useRouter();
  const { nameslug } = router.query;
  const company = useCompany(nameslug);

  return (
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
            <SimpleCard title="About" noContentPadding>
              {(company
              && !company.error
              && !company.loading)
              && (
                <>
                  <div>
                    {company.data.industry
                    && (
                      <p className="pb-2">
                        Indutry
                        <br />
                        <strong className="color-gray-dark">{company.data.industry}</strong>
                      </p>
                    )}
                    {company.data.founded
                    && (
                    <p className="pb-2">
                      Founded
                      <br />
                      <strong className="color-gray-dark">{company.data.founded}</strong>
                    </p>
                    )}
                    {company.data.headquartes
                    && (
                    <p className="m-0">
                      Headquarters
                      <br />
                      <strong className="color-gray-dark">{company.data.headquartes}</strong>
                    </p>
                    )}
                  </div>
                </>
              )}
            </SimpleCard>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 py-4">
          <div className="mb-4">
            <SimpleCard title="Description">
              {(company
              && !company.error
              && !company.loading)
              && (
                <p className="m-0">{ReactHtmlParser(company.data.description)}</p>
              )}
            </SimpleCard>
          </div>
          {(company
          && !company.error
          && !company.loading
          && company.data.Posts
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
    </div>
  );
};

export default companyHome;
