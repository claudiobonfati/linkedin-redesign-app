import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProfileOverview from '../components/ProfileOverview';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Linkedin Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className="row">
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections="658"
                views="35"
                actionMyProfile
              />
            </div>
          </div>
          <div className="col-lg-6 py-4">
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
            <ProfileOverview
              photo="/images/me.jpg"
              name="Claudio Bonfati"
              position="Software Engineer"
              connections="658"
              views="35"
              actionMyProfile
              email="claudio@example.com"
              twitter="claudioexample"
              skype="claudioexample"
            />
          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections="658"
                views="35"
                actionMyProfile
                email="claudio@example.com"
                twitter="claudioexample"
                skype="claudioexample"
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
