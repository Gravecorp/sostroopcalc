import { Component, Input, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';

@Component({
  selector: 'app-generic-calc',
  templateUrl: './generic-calc.component.html',
  styleUrls: ['./generic-calc.component.scss']
})
export class GenericCalcComponent implements OnInit {
  @Input() public army: ArmyModel= { Tiers: [], MassiveMarch: false };
  @Input() public showWarning = false;
  @Input() public warningInfo = "";
  public activeIds: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
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
