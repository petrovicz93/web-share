/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
// const enLocaleData = require('react-intl/locale-data/en');
// const deLocaleData = require('react-intl/locale-data/de');

const enTranslationMessages = require('./translations/en-US.json');
const deTranslationMessages = require('./translations/de.json');
const jaTranslationMessages = require('./translations/ja.json');

// addLocaleData(enLocaleData);
// addLocaleData(deLocaleData);

export const DEFAULT_LOCALE = 'en-US';

// prettier-ignore
export const appLocales = [
  'en-US',
  'de',
  'ja'
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  [`en-US`]: formatTranslationMessages('en-US', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
};

// exports.translationMessages = translationMessages;
// exports.appLocales = appLocales;
// exports.formatTranslationMessages = formatTranslationMessages;
// exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
