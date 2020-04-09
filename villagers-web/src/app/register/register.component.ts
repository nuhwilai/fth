import { Component, OnInit, NgZone } from '@angular/core';
import * as Survey from 'survey-angular';
import * as showdown from "showdown";
import { surveyJSON } from './register-forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  survey: any;
  result: any;
  constructor(
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.doSurvey()
  }

  doSurvey() {
    this.survey = new Survey.Model(surveyJSON);
    this.survey.data = this.result;
    this.result = null; //reset result
    this.survey.onComplete.add(result => {
      this._ngZone.run(() => {
        this.result = result.data;
      });
    });
    let converter = new showdown.Converter();
    this.survey.onTextMarkdown.add(function(survey, options) {
      //convert the mardown text to html
      var str = converter.makeHtml(options.text);
      //remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      //set html
      options.html = str;
    });

    //After render survey
    this.survey.onAfterRenderPage.add(function() {
      
    });

    let defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#3880ff";
    defaultThemeColors["$main-hover-color"] = "#3880ff";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#3880ff";

    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

    Survey.StylesManager.applyTheme();

    Survey.SurveyNG.render("surveyElement", { model: this.survey });
  }
}
