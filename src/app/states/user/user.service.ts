import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthenticationStore } from './../../core/authentication/state/authentication.store';
import { PagingModel } from './../../shared/model/paging-model';
import { User } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore, private http: HttpClient, private readonly authenticationStore: AuthenticationStore) {
  }



  getUsers(pageIndex: number, pageSize: number, username: string) {
    return this.http.get<PagingModel<User>>('api/auth/users', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        username
      }
    }).pipe(tap(res => {
      this.userStore.update({ userPaging: res });
    }));
  }

  updateUserInfo(id: string, role: string, lastName: string, firstName: string) {
    return this.http.put(`api/auth/users/${id}`, {
      role,
      lastName,
      firstName,
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`api/auth/users/${id}`);
  }

  updatePassword(id: string, newPassword: string) {
    return this.http.put(`api/auth/users/${id}/password`, {
      newPassword
    });
  }

  createUser(username: string, password: string, role: string, lastName: string, firstName: string) {
    return this.http.post('api/auth/user', {
      username,
      password,
      role,
      firstName,
      lastName
    });
  }
}
