import { NzMessageService } from 'ng-zorro-antd/message';
import { AppRole } from './../../../core/const/app-role';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import { UserQuery } from './../../../states/user/user.query';
import { UserService } from './../../../states/user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PagingModel } from 'src/app/shared/model/paging-model';
import { User } from 'src/app/states/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userPaging$ = this.userQuery.select(x => x.userPaging).pipe(tap((res) => this.userList = res?.items));
  userList: User[] = [];
  newUser: {
    username: string;
    role: string;
    password: string;
    lastName: string;
    firstName: string;
  } = {
      role: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
    };

  userUpdatePassword!: {
    id: string;
    password: string;
  };

  roleList = [AppRole.Admin, AppRole.SuperAdmin];
  pageSize = 10;

  filterName = '';

  editCache: { [key: string]: { edit: boolean; data: User } } = {};

  searchName$ = new Subject<string>();

  destroyed$ = new Subject<void>();

  isPasswordModalVisible = false;

  isCreateUserModalVisible = false;
  constructor(
    private readonly userService: UserService,
    private readonly userQuery: UserQuery,
    private readonly nzMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getUsers(1);
    this.setupFilterUsername();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  setupFilterUsername(): void {
    this.searchName$.pipe(takeUntil(this.destroyed$), debounceTime(300)).subscribe(val => this.getUsers(1, val));
  }

  onFilterNameChange(value: string): void {
    this.searchName$.next(value);
  }

  getUsers(pageIndex: number, username?: string): void {
    this.userService.getUsers(pageIndex, this.pageSize, username || '').subscribe((res) => {
      this.updateEditCache(res.items);
    });
  }

  updateEditCache(users: User[]): void {
    users.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  onPageIndexChange(index: number): void {
    this.getUsers(index);
  }

  saveNewItem(): void { }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => this.nzMessage.success('Xoá người dùng thành công'),
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  onEditClick(id: string): void {
    this.editCache[id].edit = true;
  }

  closeEdit(id: string): void {
    const index = this.userList.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.userList[index] },
      edit: false
    };
  }

  saveEditItem(item: { edit: boolean; data: User }): void {
    this.userService.updateUserInfo(item.data.id, item.data.role, item.data.lastName, item.data.firstName).subscribe(
      () => {
        item.edit = false;
        this.nzMessage.success('Cập nhật thông tin người dùng thành công');
        this.getUsers(1);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  openEditPassword(id: string): void {
    this.userUpdatePassword = {
      id,
      password: ''
    };
    this.isPasswordModalVisible = true;
  }

  closeEditModal(): void {
    this.isPasswordModalVisible = false;
  }

  updatePassword(): void {
    if (!this.userUpdatePassword.password) {
      this.nzMessage.warning('Vui lòng nhập mật khẩu mới');
      return;
    }
    this.userService.updatePassword(this.userUpdatePassword.id, this.userUpdatePassword.password).subscribe(
      () => {
        this.nzMessage.success('Cập nhật mật khẩu thành công');
        this.isPasswordModalVisible = false;
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  openCreateModal(): void {
    this.isCreateUserModalVisible = true;
  }

  closeCreateModal(): void {
    this.newUser = {
      firstName: '',
      username: '',
      lastName: '',
      password: '',
      role: ''
    };
    this.isCreateUserModalVisible = false;
  }

  createUser(): void {
    if(!this.newUser.username || !this.newUser.password || !this.newUser.role || !this.newUser.lastName || !this.newUser.firstName) {
      this.nzMessage.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.userService.createUser(this.newUser.username, this.newUser.password, this.newUser.role, this.newUser.lastName, this.newUser.firstName)
      .subscribe(() => {
        this.nzMessage.success('Tạo người dùng thành công');
        this.getUsers(1);
        this.closeCreateModal();
      },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }
}