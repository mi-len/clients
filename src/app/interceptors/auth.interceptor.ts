import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

const appKey = "kid_Bki9j4gcM";
const appSecret = "5f14ca958c5441e59977487acab7dba5";
  
@Injectable()
export class AuthInterceptor implements HttpInterceptor { 

    constructor( 
        private toastr : ToastrService,
        private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> { 

        if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            }) 
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization' : `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type' : 'application/json'
                }
            }) 
        }
    
        return next.handle(request)
            .pipe(tap((res : any) => {
                if (res instanceof HttpResponse && res.status === 200 && res.url.endsWith('login')) {
                    this.toastr.success('Sign In successful!', 'Success!')
                }
                if (res instanceof HttpResponse && res.status === 201 && res.url.endsWith('kid_Bki9j4gcM')) {
                    this.toastr.success('Register successful!', 'Success!')
                }
                if (res instanceof HttpResponse && res.status === 204 && res.url.endsWith('_logout')) {
                    this.toastr.success('Sign Out successful!', 'Success!')
                }
                if (res instanceof HttpResponse && res.status === 201 && res.url.endsWith('clients/')) {
                    this.toastr.success('Client successfuly added!', 'Success!')
                }
            })
        )
    }
}
