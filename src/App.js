import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Cookies from 'js-cookie';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Work from './components/Work/Work';
import Talk from './components/Talk/Talk';
import Preferences from './components/Preferences/Preferences';
import Privacy from './components/Privacy/Privacy';
import Footer from './components/Footer/Footer';
import ConsentToaster from './components/Utils/ConsentToaster';
// import Snippet from './components/Snippet/Snippet';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consent: this.props.consent,
      extraPadding: {
        paddingBottom: '0'
      }
    };

    this.toasterRef = React.createRef();

    this.updateConsent = this.updateConsent.bind(this);
    this.consentHandler = this.consentHandler.bind(this);
    this.dismissHandler = this.dismissHandler.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.consent.alreadyAsked) {
        this.setState({
          extraPadding: {
            paddingBottom: this.toasterRef.current.state.height + 'px'
          }
        });
      }
    }, 0);
  }

  updateConsent(isGranted) {
    this.setState({
      consent: {
        alreadyAsked: true,
        consentGranted: isGranted
      }
    });
    Cookies.set('cookie_consent', isGranted ? 'true' : 'false');
  }

  consentHandler(e) {
    let consented = false;
    if (e.currentTarget.id === 'cookie-consent-yes') {
      consented = true;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'cookie_consent_granted'
      });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'cookie_consent_denied'
      });
    }

    this.setState({
      consent: {
        alreadyAsked: true,
        consentGranted: consented
      },
      extraPadding: {}
    });
    Cookies.set('cookie_consent', consented ? 'true' : 'false');
  }

  dismissHandler(e) {
    if (e.currentTarget.id === 'dismiss-consent-toaster') {
      this.setState({
        consent: {
          alreadyAsked: true,
          consentGranted: false
        },
        extraPadding: {}
      });
    }
  }

  render() {

    return (
      <div className="App" style={this.state.extraPadding}>

        <div className="App-inner">
          <Header />
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/work">Work</Link>
                  </li>
                  <li>
                    <Link to="/contact">Talk</Link>
                  </li>
                  <li>
                    <Link to="/preferences">Prefs</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy</Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/work" component={Work} />
                <Route path="/contact" component={Talk} />
                <Route path="/preferences" render={(props) => (
                  <Preferences {...props} consent={this.state.consent} updateConsent={this.updateConsent} />
                )} />
                <Route path="/privacy" component={Privacy} />
              </Switch>
            </div>
          </Router>
          {/* <Snippet /> */}
          <Footer />
        </div>

        <ReactCSSTransitionGroup
          transitionName="toaster"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeaveTimeout={500}>
          {this.state.consent &&
            !this.state.consent.alreadyAsked &&
            <ConsentToaster ref={this.toasterRef} key={'consent-toaster'} consentHandler={this.consentHandler} dismissHandler={this.dismissHandler} />
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
