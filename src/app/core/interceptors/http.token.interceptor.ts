import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
   private toastrService: ToastrService
   
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const token = localStorage.getItem("jwtToken")
    if (token) {
      headersConfig["Authorization"] = `Token ${token}`;
    }
   
    const request = req.clone({ setHeaders: headersConfig });
    const started = Date.now();
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
          }
        },
        error => {
          if(!error.dependencies)
          {
          this.handleAuthError(error);
          }
        }
      )
    );
  }

  private handleAuthError(err: HttpErrorResponse) {
debugger
    const isForbidden: boolean = err.status === 403;
    const notFound: boolean = err.status === 404;

    if(err.status && err.error.hasOwnProperty('error')){
      let errMsg = err.error.error;
      this.toastrService.error(errMsg, 'Error', {
        easing:'ease-in',
        easeTime: 300,
        progressBar:true,
        progressAnimation : 'increasing'
      });
    }

    if (notFound) {
      if (err.status == 404) {
        this.router.navigateByUrl(`/error`);
      }
    }
    if (isForbidden) {
      this.router.navigateByUrl(`/home`);
    }

    
  }
}
export const InterceptorSkipHeader = "X-Skip-Interceptor";
