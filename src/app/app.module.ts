import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TimeRushComponent } from './time-rush/time-rush.component';
import { GamemodeUiComponent } from './gamemode-ui/gamemode-ui.component';
import { KeepAliveComponent } from './keep-alive/keep-alive.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBxzywU_485hICgDs5tPbExBKtl7N6XmRA',
  authDomain: 'two-one-dd273.firebaseapp.com',
  projectId: 'two-one-dd273',
  storageBucket: 'two-one-dd273.appspot.com',
  messagingSenderId: '854445191263',
  appId: '1:854445191263:web:ce70e56122c44df470abea',
  measurementId: 'G-B0BH3Z9S46'
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TimeRushComponent,
    GamemodeUiComponent,
    KeepAliveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
