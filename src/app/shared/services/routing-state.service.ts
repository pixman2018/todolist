import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// RxJS
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingStateService {

  history: string[] = [];

  constructor( private router: Router ) { }

  public loadRouting():void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects]
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length -3] || '/index';
  }

  public deleteHistory(): void {
    this.history = [];
  }

}
