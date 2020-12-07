import React from 'react';
import Head from 'next/head';
import LayoutPrimary from '../layouts/Primary';

export default function Home() {
  return (
    <LayoutPrimary>
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
    </LayoutPrimary>
  );
}
