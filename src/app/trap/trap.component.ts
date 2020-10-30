import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { ExtraService } from 'src/services/extra.service';

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
  public warningInfo = "";

  ngOnInit(): void {
    this.calculate();
  }

  public calculate() {
    let calcModel = this.extraService.getTrapRatios();
    let marchSize = this.armyService.LoadMarch();
    this.army = this.calculationService.calculate(calcModel, marchSize);
    let totalModel = this.armyService.total(this.army);
    let total = totalModel.Hunter + totalModel.Infantry + totalModel.Rider;
    if (total < marchSize) {
      this.showWarning = true;
      this.warningInfo = `Troops missing: ${marchSize - total} Formation: ${total}/${marchSize}`
    }
    this.calculateActive();
  }

  private calculateActive() {
    for (let i = 0; i < this.army.Tiers.length; i++) {
      let t = this.army.Tiers[i];
      if (t.Infantry > 0 || t.Rider > 0 || t.Hunter > 0) {
        this.activeIds.push(t.Level.toString());
      }
    }
  }

}
