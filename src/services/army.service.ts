import { Injectable } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { CalculationModel } from 'src/models/calculationmodel';
import { ExportModel } from 'src/models/exportmodel';
import { Tier } from 'src/models/tier';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArmyService {

  constructor(private storage: StorageService) { }

  STORAGE_KEY = "sos_army"
  RALLY_KEY = "sos_march"

  public StoreArmy(army: ArmyModel) {
    if(army.Tiers.find((x) => x.Level == 5) !== undefined)
    {
      army.Tiers = army.Tiers.filter((x) => x.Level > 6);
    }
    this.storage.Save(this.STORAGE_KEY, army);
  }

  public LoadArmy(): ArmyModel {
    let v = this.storage.Load(this.STORAGE_KEY);
    let ret = this.DefaultArmy()
    if (v !== null) {
      ret = JSON.parse(v) as ArmyModel;
    }
    ret.Tiers = ret.Tiers.filter((x) => x.Level > 6).sort((a, b) => b.Level - a.Level);
    return (ret);
  }

  private armySort(army: ArmyModel): ArmyModel {
    let ret = army;
    if (army.Tiers[0].Level == 1) {
      ret.Tiers = ret.Tiers.sort((a, b) => b.Level - a.Level);
    }
    return (ret);
  }

  public exportArmy(): string {
    let a: ExportModel = {
      marchsize: this.LoadMarch(),
      army: this.LoadArmy()
    }
    let ret = btoa(JSON.stringify(a));
    return (ret);
  }

  public importArmy(b64: string) {
    let dec = atob(b64);
    let a = JSON.parse(dec) as ExportModel;
    this.actualImportArmy(a);
  }

  public actualImportArmy(model: ExportModel) {
    this.StoreArmy(model.army);
    this.SaveMarch(model.marchsize);
  }

  public LoadMarch(): number {
    let ret = 0;
    let s = this.storage.Load(this.RALLY_KEY);
    if (s !== null) {
      ret = Number.parseInt(s);
    }
    return (ret);
  }

  public SaveMarch(size: number) {
    this.storage.SaveInt(this.RALLY_KEY, size);
  }

  public DefaultArmy(): ArmyModel {
    var arr = Array<Tier>();
    for (var i = 10; i > 6; i--) {
      var t: Tier = {
        Level: i,
        Hunter: 0,
        Infantry: 0,
        Rider: 0,
        version: 0
      }
      arr.push(t)
    }
    var ret: ArmyModel = {
      Tiers: arr,
      MassiveMarch: false
    }
    return (this.armySort(ret));
  }

  public total(army: ArmyModel): CalculationModel {
    let ret: CalculationModel = {
      Hunter: 0,
      Infantry: 0,
      Rider: 0,
      version: 0
    };
    army.Tiers.forEach((x) => {
      ret.Hunter = ret.Hunter + x.Hunter;
      ret.Infantry = ret.Infantry + x.Infantry;
      ret.Rider = ret.Rider + x.Rider
    });
    return (ret);
  }

  public resetArmy() {
    let a: ExportModel = {
      marchsize: 0,
      army: this.DefaultArmy()
    }
    this.actualImportArmy(a);
  }
}
