import { Component, OnInit } from '@angular/core';
import { ArmyModel } from 'src/models/armymodel';
import { ArmyService } from 'src/services/army.service';


@Component({
  selector: 'app-army',
  templateUrl: './army.component.html',
  styleUrls: ['./army.component.scss']
})
export class ArmyComponent implements OnInit {

  constructor(private armyService: ArmyService) { }

  public army: ArmyModel;
  public marchsize: number;

  ngOnInit(): void {
    this.army = this.armyService.LoadArmy();
    this.marchsize = this.armyService.LoadMarch();
  }

  log() {
    console.log(this.army);
  }

  save() {
    this.armyService.StoreArmy(this.army);
    this.armyService.SaveMarch(this.marchsize);
  }
}
