import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private baseUrl: string = "http://localhost:8000/";
  constructor(private http: HttpClient) { }

  get(url: string){
    return this.http.get(this.baseUrl+url);
  }

  post(url: string, body: any){
    return this.http.post(this.baseUrl+url, body);
  }

  delete(url: string){
    return this.http.delete(this.baseUrl+url);
  }

  put(url: string, body: any = []){
    return this.http.put(this.baseUrl+url, body);
  }
}
