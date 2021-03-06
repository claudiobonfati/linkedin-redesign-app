import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const notFound = () => (
  <motion.div
    className="wrapper-not-found"
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
  >
    <div className="container">
      <main className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 pt-2 pt-md-4">
          <h1 className="heading">Page not found</h1>
          <h2 className="subheading">
            Uh oh, we can’t seem to find the page you’re looking for. Try going back to the previous page.
          </h2>
          <Link href="/">
            <a className="not-found-cta">
              Go to your feed
            </a>
          </Link>
        </div>
      </main>
    </div>
  </motion.div>
);

export default notFound;
