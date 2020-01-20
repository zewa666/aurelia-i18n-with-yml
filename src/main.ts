import Backend from "i18next-xhr-backend";
import { Aurelia } from 'aurelia-framework';
import { TCustomAttribute } from "aurelia-i18n";
import moment from "moment";
import { parse } from "yamljs";

import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin("aurelia-i18n", i18n => {
      const aliases = ["t", "i18n"];
      TCustomAttribute.configureAliases(aliases);

      i18n.i18next.use(Backend);

      i18n.i18next.on("languageChanged", lng => {
        moment.locale(lng);
      });

      return i18n.setup({
        backend: {
          // loadPath: "./locales/{{lng}}/{{ns}}.json"
          loadPath: "./locales/{{lng}}/{{ns}}.yml",
          parse
        },
        attributes: aliases,
        lng: "en",
        ns: ["translation"],
        defaultNS: "translation",
        fallbackLng: "fr",
        interpolation: {
          escapeValue: false
        },
        debug: true
      })
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
