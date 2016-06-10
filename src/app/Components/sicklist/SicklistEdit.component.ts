//Vendor libs
import {Component} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import {OnInit} from "@angular/core";
import {NgClass, DatePipe} from '@angular/common';
//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Document, Person, Sicklist, SicklistType, SicklistBabyMindingType, SicklistPaymentPercent, SicklistPaymentRestrictType, TimesheetStatus} from '../../Model';
@Component({
    selector: 'sicklist-edit',
    template: require('../../Views/sicklist/Edit.html'),
	providers: [API],
	pipes: [DatePipe],
	directives: [ROUTER_DIRECTIVES,MD_COMPONENTS]
})

export class SicklistEditComponent implements OnInit
{ 
	constructor (private Api: API, private _routeParams: RouteParams) 
	{
        this.Model = new Sicklist();
		this.Model.Id = 0;
	}

    errorMessage: string;    
    Model: Sicklist;
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
		console.log(data);
		if(data.Id>0)
		{
			this.Api.Sicklists().Update(data)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
		else
		{
			this.Api.Sicklists().Create(data)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
	}
}