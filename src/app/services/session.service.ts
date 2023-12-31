import { Injectable } from '@angular/core';
import { ItemModel, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setCookie(name: string, value: ItemModel | UserModel | undefined, days: number) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    const valueTransformed = window.btoa(encodeURIComponent(JSON.stringify(value)));
    document.cookie = name + "=" + (valueTransformed || "")  + expires + "; path=/";
  }

  getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');

    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);

      if (c.indexOf(nameEQ) == 0) {
        const found = c.substring(nameEQ.length,c.length);
        const decodedFound = decodeURIComponent(window.atob(found));
        return JSON.parse(decodedFound);
      };
    }
    return null;
  }

  eraseCookie(name: string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
