import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/authentication/state/authentication.service';
import { LanguageQuery } from './core/layouts/header/state/language.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly translateService: TranslateService,
    private readonly languageQuery: LanguageQuery) {
      this.translateService.addLangs(['en', 'vi']);
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.setupTranslateService();
  }

  getUserProfile(): void {
    this.authenticationService.getUserProfile().subscribe();
  }

  setupTranslateService(): void {
    this.languageQuery.select(x => x.language).subscribe(
      lang => {
        const currentLanguage = lang ? lang : this.translateService.getDefaultLang();
        this.translateService.use(currentLanguage);
      }
    );
  }
}
