import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TipsComponent } from './components/tips/tips.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
