import React from "react";
import { Home } from '../Home/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import logoTransaction from '../../Images/transaction.svg';
class HomeView extends React.Component {
  render() {
    return (
      <Home />
    );
  }
}

export class ShowDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: false
    };
  }
  setGoBack = () => {
    this.setState({ home: true });
  };

  render() {
    return (
      <>
        {this.state.home ? (
          <HomeView />
        ) : (
          <>
            <div className="myheader">
              <img className="logo-style" src={logoTransaction}/>
              <h1>Dashboard</h1>
            </div>
            <button className="btn-back" onClick={this.setGoBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <iframe width="1480" height="900" src="https://lookerstudio.google.com/embed/reporting/efa63733-7c80-454d-92f4-850bba4b8a21/page/Gq6tD" frameborder="0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
          </>
        )}
      </>
    );
  }
}
