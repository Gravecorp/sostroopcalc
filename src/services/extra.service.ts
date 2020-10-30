import { Injectable } from '@angular/core';
import { CalculationModel } from 'src/models/calculationmodel';
import { CalculationService } from './calculation.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  TRAP_KEY = "sos_trap";
  SHOWDOWN_KEY = "sos_showdown";
  CAPITAL_KEY = "sos_capital";

  constructor(private storage: StorageService) { }

  public getTrapRatios(): CalculationModel {
    let ret = this.getRatio(this.TRAP_KEY, this.defaultTrapRatios());
    return (ret);
  }

  public saveTrapRatios(model: CalculationModel) {
    this.saveRatio(this.TRAP_KEY, model);
  }

  public defaultTrapRatios(): CalculationModel {
    let ret: CalculationModel = {
      Infantry: 0.0,
      Rider: 0.40,
      Hunter: 0.60,
      version: 1
    }
    return (ret);
  }

  public getShowdownRatios(): CalculationModel {
    let ret = this.getRatio(this.SHOWDOWN_KEY, this.defaultShowdownRatios());
    return (ret);
  }

  public saveShowdownRatios(model: CalculationModel) {
    this.saveRatio(this.SHOWDOWN_KEY, model);
  }

  public defaultShowdownRatios(): CalculationModel {
    let ret: CalculationModel = {
      Infantry: 0.58,
      Rider: 0.21,
      Hunter: 0.21,
      version: 0
    }
    return (ret);
  }

  public getCapitalRatios(): CalculationModel {
    let ret = this.getRatio(this.CAPITAL_KEY, this.defaultCapitalRatios());
    return (ret);
  }

  public saveCapitalRatios(model: CalculationModel) {
    this.saveRatio(this.CAPITAL_KEY, model);
  }

  public defaultCapitalRatios(): CalculationModel {
    let ret: CalculationModel = {
      Infantry: 0.50,
      Rider: 0.25,
      Hunter: 0.25,
      version: 0
    }
    return (ret);
  }

  private getRatio(key: string, defaultModel: CalculationModel): CalculationModel {
    let r = this.storage.Load(key);
    let ret = defaultModel;
    if (r !== null) {
      ret = JSON.parse(r) as CalculationModel;
      if(ret.version === undefined || ret.version < defaultModel.version)
      {
        ret = defaultModel
        this.saveRatio(key, defaultModel);
      }
    }
    return (ret);
  }

  private saveRatio(key: string, model: CalculationModel) {
    this.storage.Save(key, model);
  }
}
