import { Component, Input, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { CalculationModel } from 'src/models/calculationmodel';
import { CalculationResult } from 'src/models/calculationresult';

@Component({
  selector: 'app-generic-calc',
  templateUrl: './generic-calc.component.html',
  styleUrls: ['./generic-calc.component.scss']
})
export class GenericCalcComponent implements OnInit {
  @Input() public calcModels: Array<CalculationResult> = [];
  @Input() public marchSize: number;
  public active = 0;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.calcModels);
  }
}
