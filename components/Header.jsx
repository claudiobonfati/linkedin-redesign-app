import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="container">
        <div className="row">
          <div className="col">
            HEADER
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
