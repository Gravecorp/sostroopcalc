import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { ExtraService } from 'src/services/extra.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.scss']
})
export class CapitalComponent implements OnInit {

  constructor(private armyService: ArmyService, private calculationService: CalculationService,
    private extraService: ExtraService) { }

    public army: ArmyModel = { Tiers: [], MassiveMarch: false };
    public showWarning = false;
    public warningInfo = "";

  ngOnInit(): void {
    this.calculate();
  }

  public calculate() {
    let calcModel = this.extraService.getCapitalRatios();
    let marchSize = this.armyService.LoadMarch();
    this.army = this.calculationService.calculate(calcModel, marchSize);
    let totalModel = this.armyService.total(this.army);
    let total = totalModel.Hunter + totalModel.Infantry + totalModel.Rider;
    if (total < marchSize) {
      this.showWarning = true;
      this.warningInfo = `Troops missing: ${marchSize - total} Formation: ${total}/${marchSize}`
    }
  }

}