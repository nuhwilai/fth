import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.authData.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.authData.token}`,
        },
        body: request.body,
      });
    }
    return next.handle(request).pipe(
      map((event) => {
        if (
          event instanceof HttpResponse &&
          !(event.body instanceof ArrayBuffer)
        ) {
          let response_event = event as HttpResponse<any>;
          response_event = response_event.clone({
            body: response_event.body,
          });
          return response_event;
        }
        return event;
      })
    );
  }
}
