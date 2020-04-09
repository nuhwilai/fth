import { Location } from '@angular/common'
import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as showdown from 'showdown'
import * as Survey from 'survey-angular'
import { ALLERGIES, DISEASE } from './data-values'
import { surveyJSON, mockResult } from './register-forms'
import { RegisterService } from './register.service'
import { ICreateUserSuccessData } from './type'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  survey: any
  result: any

  error: boolean = false
  errorText: String

  ALLERGIES = ALLERGIES
  DISEASE = DISEASE
  constructor(
    private _ngZone: NgZone,
    private _location: Location,
    private registerService: RegisterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.result = mockResult
    this.doSurvey()
  }

  back() {
    this._location.back()
  }

  doSurvey() {
    this.survey = new Survey.Model(surveyJSON)
    this.survey.data = this.result
    this.result = null //reset result
    this.survey.onComplete.add((result) => {
      this._ngZone.run(() => {
        this.result = result.data
        this.result['allergies'] = this.result['allergies']
          ? this.result.allergies
          : []
        this.result['diseases'] = this.result['diseases']
          ? this.result.diseases
          : []
      })
    })
    let converter = new showdown.Converter()
    this.survey.onTextMarkdown.add(function (survey, options) {
      //convert the mardown text to html
      var str = converter.makeHtml(options.text)
      //remove root paragraphs <p></p>
      str = str.substring(3)
      str = str.substring(0, str.length - 4)
      //set html
      options.html = str
    })

    //After render survey
    this.survey.onAfterRenderPage.add(function () {})

    let defaultThemeColors = Survey.StylesManager.ThemeColors['default']
    defaultThemeColors['$main-color'] = '#3880ff'
    defaultThemeColors['$main-hover-color'] = '#3880ff'
    defaultThemeColors['$text-color'] = '#4a4a4a'
    defaultThemeColors['$header-color'] = '#3880ff'

    defaultThemeColors['$header-background-color'] = '#4a4a4a'
    defaultThemeColors['$body-container-background-color'] = '#f8f8f8'

    Survey.StylesManager.applyTheme()

    function checkNationalId([id, isUsePassport]) {
      if (!isUsePassport && id.length < 13) {
        return false
      } else if (!isUsePassport) {
        const digit1 = Number(String(id)[0])
        const digit2 = Number(String(id)[1])
        const digit3 = Number(String(id)[2])
        const digit4 = Number(String(id)[3])
        const digit5 = Number(String(id)[4])
        const digit6 = Number(String(id)[5])
        const digit7 = Number(String(id)[6])
        const digit8 = Number(String(id)[7])
        const digit9 = Number(String(id)[8])
        const digit10 = Number(String(id)[9])
        const digit11 = Number(String(id)[10])
        const digit12 = Number(String(id)[11])
        const digit13 = Number(String(id)[12])
        let sum =
          digit1 * 13 +
          digit2 * 12 +
          digit3 * 11 +
          digit4 * 10 +
          digit5 * 9 +
          digit6 * 8 +
          digit7 * 7 +
          digit8 * 6 +
          digit9 * 5 +
          digit10 * 4 +
          digit11 * 3 +
          digit12 * 2
        sum = (11 - (sum % 11)) % 10
        if (sum === digit13) {
          return true
        }
        return false
      }
      return true
    }

    Survey.FunctionFactory.Instance.register('checkNationalId', checkNationalId)

    Survey.SurveyNG.render('surveyElement', { model: this.survey })
  }

  notificationError(text) {
    this.error = true
    this.errorText = text
    setTimeout(() => {
      this.closeError()
    }, 5000)
  }

  closeError() {
    this.error = false
    this.errorText = null
  }

  complete() {
    this.result.isUsePassport = this.result.isUsePassport == true
    this.registerService.createUser(this.result).subscribe(
      (data: ICreateUserSuccessData) => {
        if (data.valid) {
          this.router.navigate(['show-qr-code', { ...data.data }], {
            replaceUrl: true,
          })
        } else {
          this.notificationError(data.reason)
          this.doSurvey()
        }
      },
      (err) => {
        this.notificationError(err.message)
      },
    )
  }
}
