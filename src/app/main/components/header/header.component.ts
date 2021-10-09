import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationQuery } from 'src/app/core/authentication/authentication.query';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { LanguageQuery } from 'src/app/core/localization/language.query';
import { LanguageService } from 'src/app/core/localization/language.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginPage') loginComponent!: LoginComponent;
  userProfile$ = this.authenticationQuery.userProfile$;
  languages = this.translateService.getLangs();
  languageSelected!: string;
  listFlag = [
    {
      lang: 'vi',
      flag: 'assets/flag/vn-flag.svg'
    },
    {
      lang: 'en',
      flag: 'assets/flag/usa-flag.svg'
    },
  ];
  flagLanguageSelected!: string;
  constructor(
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly languageQuery: LanguageQuery,
    private readonly translateService: TranslateService,
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getCurrentLanguage();
  }


  getCurrentLanguage(): void {
    this.languageQuery.select(x => x.language).subscribe((lang) => {
      this.languageSelected = lang;
      this.flagLanguageSelected = this.listFlag.find(x => x.lang === lang)!.flag;
    });
  }

  onChangeLanguage(lang: string): void {
    this.languageService.updateLanguage(lang);
  }

  login(): void {
    this.loginComponent.isModalVisible = true;
  }

  logout(): void {
    this.authenticationService.logout();
  }

  goAdminPage(): void {
    this.router.navigate(['admin']);
  }

}
