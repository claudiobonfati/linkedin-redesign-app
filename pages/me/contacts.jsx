import React, { Fragment } from 'react';
import SimpleCard from '../../components/SimpleCard';
import ProfileOverview from '../../components/ProfileOverview';
import ProfileDisplay from '../../components/ProfileDisplay';
import { useUser, useContacts } from '../../graphql/hooks';

function MeContacts() {
  const user = useUser('claudiobonfati');
  const contacts = useContacts(0, -1, '1');

  return (
    <div className="container">
      <main className="row">
        <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
          <div className="sticky-aside-content">
            {(user && !user.error && !user.loading)
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
        <div className="col-lg-9 col-md-8 py-4">
          <SimpleCard
            title="People"
            rightText="685 connections"
          >
            {(contacts && !contacts.error && !contacts.loading)
            && (
              <div className="w-100">
                {(contacts
                && Array.isArray(contacts.data)
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
              </div>
            )}
          </SimpleCard>
        </div>
      </main>
    </div>
  );
}

export default MeContacts;
