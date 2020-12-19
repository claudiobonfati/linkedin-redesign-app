import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProfileOverview from '../components/ProfileOverview';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

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
                connections={658}
                views={35}
                actionMyProfile
              />
            </div>
          </div>
          <div className="col-lg-6 py-4">
            <div className="mb-4">
              <CreatePost />
            </div>
            <div className="mb-4">
              <Post
                opPhoto="/images/me.jpg"
                opName="Claudio"
                opSubtitle="CEO at LNHG"
                opLink="https://google.com"
                postTime="4 hours"
                postBody="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti necessitatibus delectus voluptatibus voluptatum molestias exercitationem officiis, aperiam totam recusandae nihil amet dolor minima magni et qui provident, iure nemo!"
                postImage="https://media-exp1.licdn.com/dms/image/C4D22AQELGIFamzXfbA/feedshare-shrink_800-alternative/0/1607648580889?e=1610582400&v=beta&t=-I-CJcljenGJbGSGRo6KuI2uWUhtj2oKE8_f1zqe8M8"
                postVimeo={null}
                postLikes={354}
                postComments={[
                  {
                    id: '1',
                    time: '1 day',
                    body: 'Thanks for sharing.',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  }, {
                    id: '2',
                    time: '2 day',
                    body: 'Thanks for sharing. =)',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  },
                ]}
              />
            </div>
            <div className="mb-4">
              <Post
                opPhoto="/images/me.jpg"
                opName="Claudio"
                opSubtitle="CEO at LNHG"
                opLink="https://google.com"
                postTime="4 hours"
                postBody="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti necessitatibus delectus voluptatibus voluptatum molestias exercitationem officiis, aperiam totam recusandae nihil amet dolor minima magni et qui provident, iure nemo!"
                postImage="https://media-exp1.licdn.com/dms/image/C4D22AQELGIFamzXfbA/feedshare-shrink_800-alternative/0/1607648580889?e=1610582400&v=beta&t=-I-CJcljenGJbGSGRo6KuI2uWUhtj2oKE8_f1zqe8M8"
                postVimeo={null}
                postLikes={354}
                postComments={[
                  {
                    id: '1',
                    time: '1 day',
                    body: 'Thanks for sharing.',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  }, {
                    id: '2',
                    time: '2 day',
                    body: 'Thanks for sharing. =)',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  },
                ]}
              />
            </div>
            <div className="mb-4">
              <Post
                opPhoto="/images/me.jpg"
                opName="Claudio"
                opSubtitle="CEO at LNHG"
                opLink="https://google.com"
                postTime="4 hours"
                postBody="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti necessitatibus delectus voluptatibus voluptatum molestias exercitationem officiis, aperiam totam recusandae nihil amet dolor minima magni et qui provident, iure nemo!"
                postImage="https://media-exp1.licdn.com/dms/image/C4D22AQELGIFamzXfbA/feedshare-shrink_800-alternative/0/1607648580889?e=1610582400&v=beta&t=-I-CJcljenGJbGSGRo6KuI2uWUhtj2oKE8_f1zqe8M8"
                postVimeo={null}
                postLikes={354}
                postComments={[
                  {
                    id: '1',
                    time: '1 day',
                    body: 'Thanks for sharing.',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  }, {
                    id: '2',
                    time: '2 day',
                    body: 'Thanks for sharing. =)',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  },
                ]}
              />
            </div>
            <div className="mb-4">
              <Post
                opPhoto="/images/me.jpg"
                opName="Claudio"
                opSubtitle="CEO at LNHG"
                opLink="https://google.com"
                postTime="4 hours"
                postBody="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti necessitatibus delectus voluptatibus voluptatum molestias exercitationem officiis, aperiam totam recusandae nihil amet dolor minima magni et qui provident, iure nemo!"
                postImage="https://media-exp1.licdn.com/dms/image/C4D22AQELGIFamzXfbA/feedshare-shrink_800-alternative/0/1607648580889?e=1610582400&v=beta&t=-I-CJcljenGJbGSGRo6KuI2uWUhtj2oKE8_f1zqe8M8"
                postVimeo={null}
                postLikes={354}
                postComments={[
                  {
                    id: '1',
                    time: '1 day',
                    body: 'Thanks for sharing.',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  }, {
                    id: '2',
                    time: '2 day',
                    body: 'Thanks for sharing. =)',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  },
                ]}
              />
            </div>
            <div className="mb-4">
              <Post
                opPhoto="/images/me.jpg"
                opName="Claudio"
                opSubtitle="CEO at LNHG"
                opLink="https://google.com"
                postTime="4 hours"
                postBody="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti necessitatibus delectus voluptatibus voluptatum molestias exercitationem officiis, aperiam totam recusandae nihil amet dolor minima magni et qui provident, iure nemo!"
                postImage="https://media-exp1.licdn.com/dms/image/C4D22AQELGIFamzXfbA/feedshare-shrink_800-alternative/0/1607648580889?e=1610582400&v=beta&t=-I-CJcljenGJbGSGRo6KuI2uWUhtj2oKE8_f1zqe8M8"
                postVimeo={null}
                postLikes={354}
                postComments={[
                  {
                    id: '1',
                    time: '1 day',
                    body: 'Thanks for sharing.',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  }, {
                    id: '2',
                    time: '2 day',
                    body: 'Thanks for sharing. =)',
                    User: {
                      id: '8',
                      name: 'John McDonald',
                      photo: 'https://i.pravatar.cc/500',
                    },
                  },
                ]}
              />
            </div>

          </div>
          <div className="col-lg-3 col-md-4 py-4 d-none d-md-block">
            <div className="sticky-aside-content">
              <ProfileOverview
                photo="/images/me.jpg"
                name="Claudio Bonfati"
                position="Software Engineer"
                connections={658}
                views={35}
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
