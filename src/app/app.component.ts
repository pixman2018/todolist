import { Component } from '@angular/core';

import { RoutingStateService } from './shared/services/routing-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task';

  constructor( 
    private router: Router,
    private routingState: RoutingStateService ) {}

  goHome() {
    this.routingState.history = [];
    this.router.navigate(['task', '1']);
  }
}
