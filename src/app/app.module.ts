import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArmyComponent } from './army/army.component';
import { TrapComponent } from './trap/trap.component';
import { ShowdownComponent } from './showdown/showdown.component';
import { HeaderComponent } from './header/header.component';
import { ExtraComponent } from './extra/extra.component';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { StorageService } from 'src/services/storage.service';
import { CapitalComponent } from './capital/capital.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GenericCalcComponent } from './generic-calc/generic-calc.component';

@NgModule({
  declarations: [
    AppComponent,
    ArmyComponent,
    TrapComponent,
    ShowdownComponent,
    HeaderComponent,
    ExtraComponent,
    CapitalComponent,
    GenericCalcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ArmyService, CalculationService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
