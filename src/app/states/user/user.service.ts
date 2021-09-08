import { AuthenticationStore } from './../../core/authentication/state/authentication.store';
import { PagingModel } from './../../shared/model/paging-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

  accessToken = this.authenticationStore.getValue().accessToken;
  constructor(private userStore: UserStore, private http: HttpClient, private readonly authenticationStore: AuthenticationStore) {
  }



  getUsers(pageIndex: number, pageSize: number, username: string) {
    const header = new HttpHeaders(
      {
        'authorization': `Bearer ${this.accessToken}`
      }
    );
    return this.http.get<PagingModel<User>>('api/auth/users', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        username
      },
      headers: header
    }).pipe(tap(res => {
      this.userStore.update({ userPaging: res });
    }));
  }

  updateUserInfo(id: string, role: string, lastName: string, firstName: string) {
    const header = new HttpHeaders(
      {
        'authorization': `Bearer ${this.accessToken}`
      }
    );
    return this.http.put(`api/auth/users/${id}`, {
      role,
      lastName,
      firstName,
    }, {
      headers: header
    });
  }

  deleteUser(id: string) {
    const header = new HttpHeaders(
      {
        'authorization': `Bearer ${this.accessToken}`
      }
    );
    return this.http.delete(`api/auth/users/${id}`, { headers: header });
  }

  updatePassword(id: string, newPassword: string) {
    const header = new HttpHeaders(
      {
        'authorization': `Bearer ${this.accessToken}`
      }
    );
    return this.http.put(`api/auth/users/${id}/password`, {
      newPassword
    }, {
      headers: header
    });
  }

  createUser(username: string, password: string, role: string, lastName: string, firstName: string) {
    const header = new HttpHeaders(
      {
        'authorization': `Bearer ${this.accessToken}`
      }
    );
    return this.http.post('api/auth/user', {
      username,
      password,
      role,
      firstName,
      lastName
    }, {
      headers: header
    });
  }
}
