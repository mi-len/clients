import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

const appKey = "kid_Bki9j4gcM";
const appSecret = "5f14ca958c5441e59977487acab7dba5";
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {
    private currentAuthtoken : string;

    constructor(private http : HttpClient) { }

    login(model : LoginModel) {
        return this.http.post(loginUrl,
        JSON.stringify(model))
    }

    register(model : RegisterModel) {
        return this.http.post(registerUrl,
        JSON.stringify(model))
    }

    logout() {
        return this.http.post(logoutUrl, {})
    }

    checkIfLogged() {
        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }
    get authtoken() {
        return this.currentAuthtoken;
    }
    set authtoken(value : string) {
        this.currentAuthtoken = value;
    }

}
