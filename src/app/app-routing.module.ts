import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArmyComponent } from './army/army.component';
import { CapitalComponent } from './capital/capital.component';
import { ExtraComponent } from './extra/extra.component';
import { ShowdownComponent } from './showdown/showdown.component';
import { TrapComponent } from './trap/trap.component';

const routes: Routes = [
  { path: '', component: ArmyComponent },
  { path: 'trap', component: TrapComponent },
  { path: 'showdown', component: ShowdownComponent },
  { path: 'extra', component: ExtraComponent },
  { path: 'capital', component: CapitalComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
