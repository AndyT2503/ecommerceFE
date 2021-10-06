import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './../../authentication/login/login.component';
import { AuthenticationQuery } from './../../authentication/state/authentication.query';
import { AuthenticationStore } from './../../authentication/state/authentication.store';
import { LanguageService } from './state/language.service';

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
    private readonly authenticationStore: AuthenticationStore,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.getCurrentLanguage();
  }


  getCurrentLanguage(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.languageSelected = event.lang;
      this.flagLanguageSelected = this.listFlag.find(x => x.lang === event.lang)!.flag;
    });
  }

  onChangeLanguage(lang: string): void {
    this.languageService.updateLanguage(lang);
  }

  login(): void {
    this.loginComponent.isModalVisible = true;
  }

  logout(): void {
    this.authenticationStore.reset();
    this.router.navigate(['']);
  }

  goAdminPage(): void {
    this.router.navigate(['admin']);
  }
}
