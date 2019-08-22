import React, { Component, createContext } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../../translations/en';
import plMessages from '../../translations/pl';

const InternationalisationContext = createContext({});

class InternationalisationProvider extends Component<any, any> {
  public state = {
    locale: navigator.language.split(/[-_]/)[0] || 'en',
  };

  public setLocale = (locale: string) => this.setState({ locale });

  private getMessagesForLanguage = (locale: string) => {
    switch (locale) {
      case 'pl':
        return plMessages;
      case 'en':
      default:
        return enMessages;
    }
  };

  public render() {
    const { children } = this.props;

    const { locale } = this.state;

    // TODO: check https://github.com/formatjs/react-intl/issues/1104
    const messages: any = this.getMessagesForLanguage(locale);

    const value = { locale, messages, setLocale: this.setLocale };

    return (
      <InternationalisationContext.Provider value={value}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </InternationalisationContext.Provider>
    );
  }
}

export { InternationalisationProvider, InternationalisationContext };
