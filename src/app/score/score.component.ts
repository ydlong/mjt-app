import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../dataService';
import { Score } from '../score';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit {

  constructor( private dataService: DataService ){}

  scores : Score[] = [];
  getScores() : void {
    this.scores = this.dataService.getScores();
  }


  round_id: number = 0 ;
  game_id: number = 0;
  p1_m: number = 0;
  p2_m: number = 0;
  p3_m: number = 0;
  p4_m: number = 0;

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  //displayedColumns: string[] = ['round_id','game_id', 'p1_m', 'p2_m', 'p3_m', 'p4_m'];  
  dataSource = this.scores;

  ngOnInit(): void {
    this.getScores();
    this.displayedColumns = this.dataService.getColScore();
    this.columnsToDisplay = this.displayedColumns.slice();
    console.warn(this.scores, this.displayedColumns, this.columnsToDisplay);
  }

}
