import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FooterComponent } from './components/footer/footer.component';

const nzModules = [
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
    MainComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    nzModules,
    FormsModule,
    TranslateModule
  ]
})
export class MainModule { }
