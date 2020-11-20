import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { ExtraService } from 'src/services/extra.service';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrls: ['./showdown.component.scss']
})
export class ShowdownComponent implements OnInit {

  constructor(private armyService: ArmyService, private calculationService: CalculationService,
    private extraService: ExtraService) { }

    public army: ArmyModel = { Tiers: [], MassiveMarch: false };
    public showWarning = false;
    public warningInfo:Array<string> = [];

  ngOnInit(): void {
    this.calculate();
  }

  public calculate() {
    let calcModel = this.extraService.getShowdownRatios();
    let marchSize = this.armyService.LoadMarch();
    let result = this.calculationService.calculate(calcModel, marchSize);
    this.army = result.army;
    let totalModel = this.armyService.total(this.army);
    let total = totalModel.Hunter + totalModel.Infantry + totalModel.Rider;
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