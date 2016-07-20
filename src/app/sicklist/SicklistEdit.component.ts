// Vendor libs
import { Component } from '@angular/core';
import { Router, RouteParams  } from '@angular/router';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
// import * as moment from 'moment';
// import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
// Libs
import { FileSelectDirective } from '../UI/fileselector.component';
import { API } from '../Services';
import { DocumentApprovement, FileDto, Document, Person,
    Sicklist, SicklistType, SicklistBabyMindingType, SicklistPaymentPercent, SicklistPaymentRestrictType, TimesheetStatus
} from '../Model';

@Component({
    selector: 'sicklist-edit',
    template: require('./Edit.html'),
    providers: [API],
    pipes: [DatePipe],
    directives: [/*, /*BS_DIRECTIVES*/ FileSelectDirective]
})
export class SicklistEditComponent implements OnInit {
    constructor(private Api: API, private _routeParams: RouteParams) {
        this.Model = new Document<Sicklist>();
        this.Model.Data = new Sicklist();
        this.Model.Data.Id = 0;
        this.PersonApprovement = new DocumentApprovement();
        this.PersonApprovement.ApprovePosition = 1;
        this.PersonnelManagerApprovement = new DocumentApprovement();
        this.PersonnelManagerApprovement.ApprovePosition = 3;
        this.ManagerApprovement = new DocumentApprovement();
        this.ManagerApprovement.ApprovePosition = 2;
    }
    errorMessage: string;
    progress: number;
    isModelReady: boolean;

    ManagerApprovement: DocumentApprovement = new DocumentApprovement();
    PersonApprovement: DocumentApprovement = new DocumentApprovement();
    PersonnelManagerApprovement: DocumentApprovement = new DocumentApprovement();

    Model: Document<Sicklist>;
    SicklistTypes: SicklistType[];
    SicklistBabyMindingTypes: SicklistBabyMindingType[];
    SicklistPaymentPercents: SicklistPaymentPercent[];
    SicklistPaymentRestrictTypes: SicklistPaymentRestrictType[];
    TimesheetStatuses: TimesheetStatus[];
    Persons: Person[];
    ngOnInit() {
        this.progress = 0;
        this.isModelReady = false;
        let id = +this._routeParams.get('id');
        this.loadDictionaries();
        if (id > 0) {
            this.Get(id);
        } else { this.ReportProgress(40); }
    }
    loadDictionaries() {
        this.Api.Persons().List().subscribe(
            result => this.Persons = result,
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.SicklistTypes().List().subscribe(
            result => { this.SicklistTypes = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.SicklistBabyMindingTypes().List().subscribe(
            result => { this.SicklistBabyMindingTypes = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.SicklistPaymentPercents().List().subscribe(
            result => { this.SicklistPaymentPercents = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.SicklistPaymentRestrictTypes().List().subscribe(
            result => { this.SicklistPaymentRestrictTypes = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.TimesheetStatuses().List().subscribe(
            result => { this.TimesheetStatuses = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(10));
        this.Api.SicklistPaymentRestrictTypes().List().subscribe(
            result => { this.SicklistPaymentRestrictTypes = result; },
            error => this.errorMessage = <any>error);
        this.Api.TimesheetStatuses().List().subscribe(
            result => { this.TimesheetStatuses = result; },
            error => this.errorMessage = <any>error);
    }
    ReportProgress(value) {
        this.progress += value;
        if (this.progress == 100) { this.OnModelReady(); }
    }
    OnModelReady() {
        ///Approvements
        if (this.Model.Approvements) {
            var person = this.Model.Approvements.filter(x => x.ApprovePosition == 1);
            var manager = this.Model.Approvements.filter(x => x.ApprovePosition == 2);
            var personnelmanager = this.Model.Approvements.filter(x => x.ApprovePosition == 3);
            if (person && person.length > 0) {
                this.PersonApprovement = person[0];
            } else { this.Model.Approvements.push(this.PersonApprovement); }
            if (manager && manager.length > 0) { this.ManagerApprovement = manager[0]; }
            else { this.Model.Approvements.push(this.ManagerApprovement); }
            if (personnelmanager && personnelmanager.length > 0) { this.PersonnelManagerApprovement = personnelmanager[0]; }
            else { this.Model.Approvements.push(this.PersonnelManagerApprovement); }
        } else {
            this.Model.Approvements = [];
            this.Model.Approvements.push(this.PersonApprovement);
            this.Model.Approvements.push(this.ManagerApprovement);
            this.Model.Approvements.push(this.PersonnelManagerApprovement);
        }
        ///Dropdowns correction
        if (this.Model.Data.SicklistBabyMindingType) {
            this.Model.Data.SicklistBabyMindingType =
                this.SicklistBabyMindingTypes.filter(x => x.Id == this.Model.Data.SicklistBabyMindingType.Id)[0];
        }
        if (this.Model.Data.SicklistPaymentPercent) {
            this.Model.Data.SicklistPaymentPercent =
                this.SicklistPaymentPercents.filter(x => x.Id == this.Model.Data.SicklistPaymentPercent.Id)[0];
        }
        if (this.Model.Data.SicklistPaymentRestrictType) {
            this.Model.Data.SicklistPaymentRestrictType =
                this.SicklistPaymentRestrictTypes.filter(x => x.Id == this.Model.Data.SicklistPaymentRestrictType.Id)[0];
        }
        if (this.Model.Data.SicklistType) {
            this.Model.Data.SicklistType =
                this.SicklistTypes.filter(x => x.Id == this.Model.Data.SicklistType.Id)[0];
        }
        if (this.Model.Data.TimesheetStatus) {
            this.Model.Data.TimesheetStatus =
                this.TimesheetStatuses.filter(x => x.Id == this.Model.Data.TimesheetStatus.Id)[0];
        }
        this.isModelReady = true;
    }
    DownloadFile(type) {
        this.Api.Sicklists(this.Model.Data.Id).GetFileKey(type).subscribe(
            result => { this.Api.download(result); },
            error => this.errorMessage = <any>error);
    }
    Get(id: number) {
        this.Api.Sicklists(id).Read()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error,
            () => this.ReportProgress(40)
            );
    }
    Save() {
        this.progress = 60;
        this.isModelReady = false;
        var data = this.Model;
        if (data.Data.Id > 0) {
            this.Api.Sicklists().Update(data, true)
                .subscribe(
                result => { this.Model = result; console.log(result); },
                error => this.errorMessage = <any>error,
                () => this.ReportProgress(40)
                );
        } else {
            this.Api.Sicklists().Create(data, true)
                .subscribe(
                result => { this.Model = result; console.log(result); },
                error => this.errorMessage = <any>error,
                () => this.ReportProgress(40)
                );
        }
    }
}
