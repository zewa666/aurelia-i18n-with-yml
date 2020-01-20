import { autoinject } from "aurelia-framework";
import { I18N } from "aurelia-i18n";

@autoinject()
export class App {
  public message: string = 'Hello World!';

  constructor(private i18n: I18N) {}

  public toggleLocale() {
    this.i18n.setLocale(this.i18n.getLocale() === "en" ? "fr" : "en");
  }
}
