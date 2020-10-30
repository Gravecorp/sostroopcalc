import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public Load(key: string) {
    return localStorage.getItem(key);
  }

  public Save(key:string, value: any)
  {
    let stor = JSON.stringify(value);
    localStorage.setItem(key, stor);
  }

  public SaveInt(key:string, value: number)
  {
    localStorage.setItem(key, value.toString());
  }
}
