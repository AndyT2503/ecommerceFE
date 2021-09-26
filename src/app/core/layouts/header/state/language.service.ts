import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStore } from './language.store';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(private languageStore: LanguageStore) {
  }


  updateLanguage(lang: string): void {
    this.languageStore.update({language: lang});
  }

}
