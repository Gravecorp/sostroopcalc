import { Component, OnInit } from '@angular/core';
import { CalculationModel } from 'src/models/calculationmodel';
import { ExportModel } from 'src/models/exportmodel';
import { ArmyService } from 'src/services/army.service';
import { ExtraService } from 'src/services/extra.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {

  constructor(private extraService: ExtraService, private armyService: ArmyService) { }

  public trap: CalculationModel = this.extraService.getTrapRatios();
  public showdown: CalculationModel = this.extraService.getShowdownRatios();
  public capital: CalculationModel = this.extraService.getCapitalRatios();

  public importString: string = '';
  public bookmarkString: string = '';

  ngOnInit(): void {
  }

  public get armyExport(): string {
    let ret = this.armyService.exportArmy();
    return (ret);
  }

  public importArmy() {
    if (this.importString.length > 0) {
      this.armyService.importArmy(this.importString);
    }
  }

  public trapDefault() {
    this.trap = this.extraService.defaultTrapRatios();
    this.save();
  }

  public showdownDefault() {
    this.showdown = this.extraService.defaultShowdownRatios();
    this.save();
  }

  public capitalDefault() {
    this.capital = this.extraService.defaultCapitalRatios();
    this.save();
  }

  public save() {
    this.extraService.saveTrapRatios(this.trap);
    this.extraService.saveShowdownRatios(this.showdown);
    this.extraService.saveCapitalRatios(this.capital);
  }

  public resetArmy() {
    this.armyService.resetArmy();
  }

  public importBookmark() {
    if (this.bookmarkString.length > 0) {
      let q = this.bookmarkString.substr(this.bookmarkString.indexOf('?') + 1);
      let b = this.parse_query_string(q) as any;
      let mSize = Number.parseInt(b.m);
      let army = this.armyService.DefaultArmy();
      for (let i = 0; i < army.Tiers.length; i++) {
        let t = army.Tiers[i];
        if (t.Level === 7) {
          t.Hunter = Number.parseInt(b.t7h);
          t.Infantry = Number.parseInt(b.t7i);
          t.Rider = Number.parseInt(b.t7r);
        }
        if (t.Level === 8) {
          t.Hunter = Number.parseInt(b.t8h);
          t.Infantry = Number.parseInt(b.t8i);
          t.Rider = Number.parseInt(b.t8r);
        }
        if (t.Level === 9) {
          t.Hunter = Number.parseInt(b.t9h);
          t.Infantry = Number.parseInt(b.t9i);
          t.Rider = Number.parseInt(b.t9r);
        }
      }
      let e: ExportModel = {
        marchsize: mSize,
        army: army
      }
      this.armyService.actualImportArmy(e);
    }
  }

  private parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }
}
