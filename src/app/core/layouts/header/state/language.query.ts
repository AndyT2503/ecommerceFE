import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LanguageStore, LanguageState } from './language.store';

@Injectable({ providedIn: 'root' })
export class LanguageQuery extends QueryEntity<LanguageState> {

  constructor(protected store: LanguageStore) {
    super(store);
  }

}
