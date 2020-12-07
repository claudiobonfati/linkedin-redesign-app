import React from 'react';
import Header from '../components/Header';

const LayoutPrimary = (props) => (
  <div className="layout-wrapper">
    <Header />
    {props.children}
  </div>
);

export default LayoutPrimary;
