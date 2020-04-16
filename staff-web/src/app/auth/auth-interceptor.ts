import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http'
import { AuthService } from './auth.service'
import { Observable } from 'rxjs'

import { map } from 'rxjs/operators'

import get from 'lodash/get'
import { MessageService } from 'primeng/api'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private messageService: MessageService,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.auth.authData.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.authData.token}`,
        },
        body: request.body,
      })
    }
    return next.handle(request).pipe(
      map((event) => {
        if (
          event instanceof HttpResponse &&
          !(event.body instanceof ArrayBuffer)
        ) {
          let response_event = event as HttpResponse<any>
          if (
            !get(response_event, 'body.valid') &&
            get(response_event, 'body.reason') === 'invalid_token'
          ) {
            this.auth.logout()
            this.messageService.add({
              severity: 'error',
              detail:
                'มีปัญหาการเข้าในใช้งาน โปรดลงชื่อเข้าใช้ใหม่ ( Invalid token )',
            })
            return
          }
          response_event = response_event.clone({
            body: response_event.body,
          })
          return response_event
        }
        return event
      }),
    )
  }
}
