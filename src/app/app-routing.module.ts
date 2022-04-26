import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { KeepAliveComponent } from './keep-alive/keep-alive.component';
import { TimeRushComponent } from './time-rush/time-rush.component';

const routes: Routes = [
  { path: 'time-rush', component: TimeRushComponent },
  { path: 'keep-alive', component: KeepAliveComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
