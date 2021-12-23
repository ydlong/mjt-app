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

  displayedColumns: string[] = [];
  colToDisplayed: string[] = [];

  dataSource = this.scores;

  ngOnInit(): void {
    this.getScores();
    this.displayedColumns = this.dataService.getColScore();
    this.colToDisplayed = this.displayedColumns.slice();
    
    console.warn(this.scores, this.displayedColumns);
  }

}
