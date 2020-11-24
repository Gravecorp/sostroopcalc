import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';
import { CalculationService } from 'src/services/calculation.service';
import { ExtraService } from 'src/services/extra.service';
import { CalculationModel } from '../../models/calculationmodel';
import { CalculationResult } from '../../models/calculationresult';

@Component({
  selector: 'app-showdown',
  templateUrl: './showdown.component.html',
  styleUrls: ['./showdown.component.scss']
})
export class ShowdownComponent implements OnInit {

  constructor(private armyService: ArmyService, private calculationService: CalculationService,
    private extraService: ExtraService) { }
    public calcModels: Array<CalculationResult> = [];

    public marchSize: number;
  
    ngOnInit(): void {
      this.calculate();
    }
  
    public calculate() {
      let calcModel: CalculationModel = this.extraService.getShowdownRatios();
      this.marchSize = this.armyService.LoadMarch();
      let army: ArmyModel = this.armyService.LoadArmy();
      this.calcModels = this.calculationService.calc2(calcModel, this.marchSize);
      this.calcModels = [this.calcModels[0]];
    }
  }
  