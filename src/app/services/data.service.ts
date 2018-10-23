import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from '../models/client.model'

const appKey = "kid_Bki9j4gcM";
// const appSecret = "5f14ca958c5441e59977487acab7dba5";
const allUrl = `https://baas.kinvey.com/appdata/${appKey}/clients/`
const clientUrl = `https://baas.kinvey.com/appdata/${appKey}/clients/`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient ) { }

    getAllClients() {
        return this.http.get(allUrl)
    }

    add(model : ClientModel) {
        return this.http.post(allUrl, model)
    }

    getClient(id : string) {
        return this.http.get(clientUrl + id)
    }

    editClient(id : string, model : ClientModel) {
        return this.http.put(allUrl + id, model)
    }

    deleteClient(id : string) {
        return this.http.delete(clientUrl + id)
    }

}
