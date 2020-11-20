import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { ExtraService } from 'src/services/extra.service';
import { CalculationModel } from '../../models/calculationmodel';
import { CalculationResult } from '../../models/calculationresult';

@Component({
  selector: 'app-trap',
  templateUrl: './trap.component.html',
  styleUrls: ['./trap.component.scss']
})
export class TrapComponent implements OnInit {

  constructor(private armyService: ArmyService, private calculationService: CalculationService,
    private extraService: ExtraService) { }

  public army: ArmyModel = { Tiers: [], MassiveMarch: false };
  public activeIds: Array<string> = [];
  public showWarning = false;
  public warningInfo:Array<string> = [];

  ngOnInit(): void {
    this.calculate();
  }

  public calculate() {
    let calcModel: CalculationModel = this.extraService.getTrapRatios();
    let marchSize: number = this.armyService.LoadMarch();
    let result: CalculationResult = this.calculationService.calculate(calcModel, marchSize);
    this.army = result.army;
    let totalModel: CalculationModel = this.armyService.total(this.army);
    let total: number = totalModel.Hunter + totalModel.Infantry + totalModel.Rider;
    if(this.army.MassiveMarch) {
      marchSize = Math.floor(marchSize * 1.10)
    }
    if(result.totals.Infantry > totalModel.Infantry)
    {
      this.warningInfo.push(`Missing ${result.totals.Infantry - totalModel.Infantry} Infantry`);
    }
    if(result.totals.Rider > totalModel.Rider)
    {
      this.warningInfo.push(`Missing ${result.totals.Rider - totalModel.Rider} Riders`);
    }
    if(result.totals.Hunter > totalModel.Hunter)
    {
      this.warningInfo.push(`Missing ${result.totals.Hunter - totalModel.Hunter} Hunters`);
    }
    if (total < marchSize) {
      this.showWarning = true;
      this.warningInfo.push(`Formation: ${total}/${marchSize}`);
    }
  }
}
