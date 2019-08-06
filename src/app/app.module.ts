import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

// locale
import { LOCALE_ID} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

//
import { AppComponent } from './app.component';
import { TasksModule } from './pages/tasks/tasks.module';
// Examples
import { RxjsComponent } from './example/rxjs/rxjs.component';
import { AnimationComponent } from './example/animation/animation.component';


registerLocaleData(localeDe, localeDeExtra);


@NgModule({
  declarations: [
    AppComponent,

    // Expample
    RxjsComponent,
    AnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // components
    TasksModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/tasks-list' },
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
