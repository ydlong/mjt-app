import { Component, OnInit, ViewChild, AfterViewInit, Output, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../dataService';
import { Score } from '../score';
import { MatTable } from '@angular/material/table';
import { AppService } from '../app.services';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
=======
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
>>>>>>> e8d7bdd574eeaaa55cddd73b1ed215beb1aae66e

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit, AfterViewInit {

  public mtformgroup!: FormGroup;
  public mtformarray!: FormArray;

  clickEventsubscription:Subscription;

  constructor( private dataService: DataService, private appService:AppService, private fb:FormBuilder){
    this.clickEventsubscription = this.appService.getScoreChangeEvent().subscribe(()=>{
      this.getScores();
      this.dataSource = this.scores;
      this.scoreTable.renderRows();
    })  
  }

  scores : Score[] = [];
  getScores() : void {
    this.scores = this.dataService.getScores();
  }

  displayedColumns: string[] = [];
  colHeaderToDisplayed: String[] = [];
  dataSource = this.scores;
  tblDef: Array<any> = [];

  @ViewChild('scoresTable') scoreTable!: MatTable<any> ;

  // Not using
  objLookup(obj:any):void{
    this.colHeaderToDisplayed = Object.keys(obj)
    .map(function(key) {
        return obj[key];
    });
    console.warn(this.colHeaderToDisplayed);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.displayedColumns = this.dataService.getColScore();
    this.tblDef = this.dataService.getTableDef();  
    this.colHeaderToDisplayed = this.displayedColumns.slice();
<<<<<<< HEAD
    this.mtformarray = this.fb.array([]);
    this.mtformgroup = this.fb.group({FormArray: this.mtformarray});
=======
>>>>>>> e8d7bdd574eeaaa55cddd73b1ed215beb1aae66e
    
  }

}
