import { ArmyModel } from './armymodel';
import { CalculationModel } from './calculationmodel';

export interface CalculationResult {
    army: ArmyModel,
    totals: CalculationModel
}