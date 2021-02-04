import React, { Fragment, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sticky from 'react-sticky-el';
import SimpleCard from '../../components/SimpleCard';
import CurrentProfileOverview from '../../components/CurrentProfileOverview';
import ProfileDisplay from '../../components/ProfileDisplay';
import { useContacts } from '../../graphql/hooks';
import defaultVariants from '../../utils/FramerMotionDefault';

function MeContacts() {
  const contacts = useContacts(0, -1, '1');

  let jsxContactsList = null;

  if (contacts
      && !contacts.error
      && !contacts.loading) {
    jsxContactsList = (
      <>
        {(Array.isArray(contacts.data)
        && contacts.data.length > 0)
        && (
          <>
            {contacts.data.map((contact, index) => (
              <div className={`${(index < contacts.data.length - 1) ? 'border-bottom-gray' : 'pb-0'} ${(index === 0) ? 'pb-3' : ' py-3'}`} key={contact.id}>
                <ProfileDisplay
                  link={`/profile/${contact.username}/details`}
                  image={contact.photo}
                  imageSize={60}
                  title={contact.name}
                  subtitle={contact.headline}
                  rightButtonText="Message"
                  rightButtonLink="https://www.google.com/"
                />
              </div>
            ))}
          </>
        )}
      </>
    );
  }

  useEffect(() => {
    // Reseting scroll manually (FramerMotion dependency)
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
        <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
          <div className="sticky-aside-content">
            <Sticky topOffset={-20} scrollElement=".stickyArea">
              <CurrentProfileOverview />
            </Sticky>
          </div>
        </div>
        <div className="col-lg-9 col-md-8 py-4">
          <SimpleCard
            title="People"
            rightText="685 connections"
          >
            {jsxContactsList}
          </SimpleCard>
        </div>
      </main>
    </motion.div>
  );
}

export default MeContacts;
