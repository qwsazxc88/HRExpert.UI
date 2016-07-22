import { SicklistBabyMindingType } from './SicklistBabyMindingType';
import { SicklistType } from './SicklistType';
import { SicklistPaymentRestrictType } from './SicklistPaymentRestrictType';
import { SicklistPaymentPercent } from './SicklistPaymentPercent';
import { TimesheetStatus } from './TimesheetStatus';
// import { Document } from './Document';

export class Sicklist {
    id: number;
    sicklistBabyMindingType: SicklistBabyMindingType;
    sicklistPaymentPercent: SicklistPaymentPercent;
    sicklistPaymentRestrictType: SicklistPaymentRestrictType;
    timesheetStatus: TimesheetStatus;
    sicklistType: SicklistType;
    beginDate: Date;
    endDate: Date;
    sicklistNumber: string;
    sicklistDocument: File;
}
