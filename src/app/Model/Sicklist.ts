import {SicklistBabyMindingType} from './SicklistBabyMindingType';
import {SicklistType} from './SicklistType';
import {SicklistPaymentRestrictType} from './SicklistPaymentRestrictType';
import {SicklistPaymentPercent} from './SicklistPaymentPercent';
import {TimesheetStatus} from './TimesheetStatus';
import {Document} from './Document';
export class Sicklist
{
    Id : number;
    SicklistBabyMindingType: SicklistBabyMindingType;
    SicklistPaymentPercent: SicklistPaymentPercent;
    SicklistPaymentRestrictType: SicklistPaymentRestrictType;
    TimesheetStatus: TimesheetStatus;
    SicklistType: SicklistType;
    BeginDate: Date;
    EndDate : Date;
    SicklistNumber : string;
}