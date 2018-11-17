import { Injectable } from '@angular/core';
import { random } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaders = Array(11).fill(0).map((_, i) => `assets/loaders/loader${i + 1}.gif`);
  public randomLoader = () => random(this.loaders);
  constructor() { }
}
