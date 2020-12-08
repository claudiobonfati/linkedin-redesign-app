import React from 'react';
import Header from '../Header';

const Global = (props) => (
  <div className="layout-wrapper">
    <Header />
    {props.children}
  </div>
);

export default Global;
