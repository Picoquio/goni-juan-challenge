import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { IUser } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseAPIurl;
  private readonly user?: IUser;

  dummyAdminToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXX0.TlcsEJDxL8s3Ocbt7n0YPik87l2VtY7DPreX4Y9gQnE';
  dummyUserToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlcyI6WyJ1c2VyIl19.LW5pvc1TRaIk3FNaMADQmjx2Hy86weS64WtVdgK1oZk';

  get currentUser(): IUser | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(username: string, password: string): boolean {
    switch (username) {
      case "admin":
        localStorage.setItem('token', this.dummyAdminToken);
        return true;
        break;
      case "user":
        localStorage.setItem('token', this.dummyUserToken);
        return true;
        break;

      default:

        //TODO: notificar credenciales inválidas
        return false;
        break;
    }
  }

  logout(): void {
    localStorage.clear();
  }

  checkAuthentication() {
    if (!localStorage.getItem('token')) return false;
    return true;

    const token = localStorage.getItem('token');

  }

  // constructor(private http: HttpClient) { }

}