import { Component, Input, OnInit } from '@angular/core';
import { CalculationModel } from 'src/models/calculationmodel';
import { CalculationResult } from 'src/models/calculationresult';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent implements OnInit {
  @Input() public model: CalculationResult;
  @Input() public marchSize: number;
  @Input() public prefix: string = "";
  public activeIds: Array<string> = [];
  public showWarning = false;
  public warningInfo: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    //console.log(this.model);
    this.calculateActive();
    this.warnings();
  }

  private calculateActive() {
    for (let i = 0; i < this.model.army.Tiers.length; i++) {
      let t = this.model.army.Tiers[i];
      if (t.Infantry > 0 || t.Rider > 0 || t.Hunter > 0) {
        this.activeIds.push(`${this.prefix}-${t.Level.toString()}`);
      }
    }
  }

  private warnings() {
    let total: number = this.model.contains.Hunter + this.model.contains.Infantry + this.model.contains.Rider;
    
    if (this.model.army.MassiveMarch) {
      this.marchSize = Math.floor(this.marchSize * 1.10)
    }
    if (this.model.shouldContain.Infantry > this.model.contains.Infantry) {
      this.warningInfo.push(`Missing ${this.model.shouldContain.Infantry - this.model.contains.Infantry} Infantry`);
    }
    if (this.model.shouldContain.Rider > this.model.contains.Rider) {
      this.warningInfo.push(`Missing ${this.model.shouldContain.Rider - this.model.contains.Rider} Riders`);
    }
    if (this.model.shouldContain.Hunter > this.model.contains.Hunter) {
      this.warningInfo.push(`Missing ${this.model.shouldContain.Hunter - this.model.contains.Hunter} Hunters`);
    }
    if (total < this.marchSize) {
      this.showWarning = true;
      this.warningInfo.push(`Formation: ${total}/${this.marchSize}`);
    }
  }
}
