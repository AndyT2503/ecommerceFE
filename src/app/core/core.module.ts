import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from './layouts/footer/footer.component';

const nzModule = [
  NzIconModule,
  NzInputModule,
  NzBadgeModule,
  NzDropDownModule,
  NzModalModule,
  NzButtonModule,
  NzMessageModule,
  NzRadioModule,
];


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    nzModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
