import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Linkedin Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className="row">
          <div className="col">
            <h1>
              Linkedin Redesign
            </h1>
          </div>
        </main>
      </div>
    </Layout>
  );
}
