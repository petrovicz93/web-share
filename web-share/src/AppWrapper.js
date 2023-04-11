import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import detectBrowserLanguage from 'detect-browser-language';
import { connect } from 'react-redux';

import { translationMessages } from './i18n.js';

import App from './App';

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserLanguage: detectBrowserLanguage(),
      countryCode: '', // countryCode is not matched to a langauge of browser so there will be another approach
    };
  }

  componentDidMount() {
    fetch('https://extreme-ip-lookup.com/json/')
      .then((res) => res.json())
      .then((response) => {
        this.setState((prevState) => ({
          ...prevState,
          countryCode: response.countryCode,
        }));
      })
      .catch((data, status) => {
        console.log('Request failed');
      });
  }

  render() {
    const locale =
      this.props.global.locale || this.browserLanguage || this.countryCode;

    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={translationMessages[locale]}
      >
        <App />
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AppWrapper);
