import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  getCache(key: string) {
    let cacheVal = JSON.parse(localStorage.getItem(key));
    return cacheVal
  }

  setCache(key: string, val: any) {
    return localStorage.setItem(key, JSON.stringify(val));
  }

  clearCache() {
    localStorage.clear();
  }

  removeLocalKey(key: string) {
    localStorage.removeItem(key);
  }

  getLength() {
    return localStorage.length
  }

  getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setSession(key: string, val: any) {
    return sessionStorage.setItem(key, JSON.stringify(val));
  }

  clearSession() {
    sessionStorage.clear();
  }

  removeSessionKey(key: string) {
    sessionStorage.removeItem(key);
  }
  
}
