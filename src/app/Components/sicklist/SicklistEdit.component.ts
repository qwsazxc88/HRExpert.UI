//Vendor libs
import {Component} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import {OnInit} from "@angular/core";
import {NgClass, DatePipe} from '@angular/common';
import * as moment from 'moment';
//Libs
import {MD_COMPONENTS} from '../';
import {FileSelectDirective} from '../UI/fileselector.component';
import {API} from '../../Services';
import {FileDto, Document, Person, Sicklist, SicklistType, SicklistBabyMindingType, SicklistPaymentPercent, SicklistPaymentRestrictType, TimesheetStatus} from '../../Model';
@Component({
    selector: 'sicklist-edit',
    template: require('../../Views/sicklist/Edit.html'),
	providers: [API],
	pipes: [DatePipe],
	directives: [ROUTER_DIRECTIVES,MD_COMPONENTS,FileSelectDirective]
})

export class SicklistEditComponent implements OnInit
{ 
	constructor (private Api: API, private _routeParams: RouteParams) 
	{
        this.Model = new Document<Sicklist>();
		this.Model.Data = new Sicklist();	
		this.Model.Data.Id = 0;
	}
    errorMessage: string;    
    Model: Document<Sicklist>;	
    SicklistTypes: SicklistType[];
    SicklistBabyMindingTypes : SicklistBabyMindingType[];
    SicklistPaymentPercents: SicklistPaymentPercent[];
    SicklistPaymentRestrictTypes: SicklistPaymentRestrictType[];
    TimesheetStatuses : TimesheetStatus[];
    Persons: Person[];
    ngOnInit() {
        let id =+this._routeParams.get('id');
        this.loadDictionaries();        
		if(id>0)
		{
			this.Get(id);
        }		
	}
	loadDictionaries()
    {
        this.Api.Persons().List().subscribe(result=>this.Persons=result, error=>this.errorMessage=<any>error);
        this.Api.SicklistTypes().List().subscribe(result=>{this.SicklistTypes = result;}, error => this.errorMessage = <any> error);
        this.Api.SicklistBabyMindingTypes().List().subscribe(result=>{this.SicklistBabyMindingTypes = result;}, error => this.errorMessage = <any> error);
        this.Api.SicklistPaymentPercents().List().subscribe(result=>{this.SicklistPaymentPercents = result;}, error => this.errorMessage = <any> error);
        this.Api.SicklistPaymentRestrictTypes().List().subscribe(result=>{this.SicklistPaymentRestrictTypes = result;}, error => this.errorMessage = <any> error);
        this.Api.TimesheetStatuses().List().subscribe(result=>{this.TimesheetStatuses = result;}, error => this.errorMessage = <any> error);
    }
	isModelReady(){
		return this.Model && 
		this.SicklistBabyMindingTypes &&
		this.SicklistPaymentPercents &&
		this.SicklistPaymentRestrictTypes &&
		this.TimesheetStatuses;
	}
	DownloadFile(type)
	{
		this.Api.Sicklists(this.Model.Data.Id).GetFileKey(type).subscribe(result=>{this.Api.download(result)},error=>this.errorMessage = <any>error);
	}
    Get(id:number) {        
        this.Api.Sicklists(id).Read()
					.subscribe(
						result => {this.Model = result;},
						error => this.errorMessage = <any>error
					);
    }
	Save()
	{
		var data = this.Model;		
		if(data.Data.Id>0)
		{
			this.Api.Sicklists().Update(data, data.Data.SicklistDocument?true:false)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
		else
		{
			this.Api.Sicklists().Create(data, data.Data.SicklistDocument?true:false)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
	}
}