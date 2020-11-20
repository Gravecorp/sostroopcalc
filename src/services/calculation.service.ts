import { Injectable } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { CalculationModel } from 'src/models/calculationmodel';
import { CalculationResult } from 'src/models/calculationresult';
import { Tier } from 'src/models/tier';
import { ArmyService } from './army.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private armyService: ArmyService) { }

  calculate(calcModel: CalculationModel, size: number) {
    let army = this.armyService.LoadArmy();
    if(army.MassiveMarch)
    {
      size = Math.floor(size * 1.10);
    }
    let result: ArmyModel = this.armyService.DefaultArmy();
    result.MassiveMarch = army.MassiveMarch;
    let infTotal = Math.floor(size * calcModel.Infantry);
    let riderTotal = Math.floor(size * calcModel.Rider);
    let hunterTotal = size - (infTotal + riderTotal);
    let totalResult: CalculationModel = {
      Infantry: infTotal,
      Rider: riderTotal,
      Hunter: hunterTotal,
      version: 0
    }
    for (let i = 0; i < army.Tiers.length; i++) {
      let t = army.Tiers[i];
      if (t.Infantry > infTotal) {
        result.Tiers[i].Infantry = infTotal;
        infTotal = 0;
      }
      else {
        result.Tiers[i].Infantry = t.Infantry;
        infTotal = infTotal - t.Infantry;
      }
      if (t.Rider > riderTotal) {
        result.Tiers[i].Rider = riderTotal;
        riderTotal = 0;
      }
      else {
        result.Tiers[i].Rider = t.Rider;
        riderTotal = riderTotal - t.Rider;
      }
      if (t.Hunter > hunterTotal) {
        result.Tiers[i].Hunter = hunterTotal;
        hunterTotal = 0;
      }
      else {
        result.Tiers[i].Hunter = t.Hunter;
        hunterTotal = hunterTotal - t.Hunter
      }
    }
    let ret: CalculationResult = {
      army: result,
      totals: totalResult
    }
    return (ret)
  }
}
