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
    return (this.calc2(calcModel, size)[0])
  }

  calc2(calcModel: CalculationModel, size: number) {
    let army = this.armyService.LoadArmy();
    if (army.MassiveMarch) {
      size = Math.floor(size * 1.10);
    }
    let result = this.armyCalc(army, calcModel, size);
    let ret: Array<CalculationResult> = [result];
    let run = true;
    let last = result;
    let count = 1;
    do {
      //console.log(army);
      let m = this.armyService.DefaultArmy(army.MassiveMarch);
      for (let i = 0; i < last.army.Tiers.length; i++) {
        let lastTier = last.army.Tiers[i];
        let armyTier = army.Tiers[i];
        let rHunters = armyTier.Hunter - lastTier.Hunter;
        let rRider = armyTier.Rider - lastTier.Rider
        let rInfantry = armyTier.Infantry - lastTier.Infantry;
        m.Tiers[i].Hunter = rHunters;
        m.Tiers[i].Rider = rRider;
        m.Tiers[i].Infantry = rInfantry;
      }
      army = m;
      let mResult = this.armyCalc(m, calcModel, size);
      ret.push(mResult);
      if (mResult.contains.Infantry < mResult.shouldContain.Infantry
        || mResult.contains.Hunter < mResult.shouldContain.Hunter
        || mResult.contains.Rider < mResult.shouldContain.Rider) {
        run = false;
      }

      last = mResult;
      count++;
    } while (run && count < 6)

    return ret;
  }

  private armyCalc(army: ArmyModel, calcModel: CalculationModel, size: number) {
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
      shouldContain: totalResult,
      contains: this.armyService.total(result),
      show: true
    }
    return (ret)
  }
}
