import { Component, OnInit, ViewChild, AfterViewInit, Output, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../dataService';
import { Score } from '../score';
import { MatTable } from '@angular/material/table';
import { AppService } from '../app.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit, AfterViewInit {

  clickEventsubscription:Subscription;
  constructor( private dataService: DataService, private appService:AppService){
    this.clickEventsubscription = this.appService.getClickEvent().subscribe(()=>{
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
  colToDisplayed: string[] = [];
  dataSource = this.scores;

  @ViewChild('scoresTable') scoreTable!: MatTable<any> ;
  
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.displayedColumns = this.dataService.getColScore();
    this.colToDisplayed = this.displayedColumns.slice();
  }

}
