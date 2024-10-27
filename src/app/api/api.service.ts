import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { UsersResponse } from "./interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseAPIurl;

  getAllUsers(): Observable<UsersResponse[]> {
    return this.http.get<UsersResponse[]>(`${this.baseUrl}/users`)
  }



}
