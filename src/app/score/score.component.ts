import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../dataService';
import { Score } from '../score';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit {

  constructor( private dataService: DataService, private changeDetectorRefs: ChangeDetectorRef ){}

  scores : Score[] = [];
  getScores() : void {
    this.scores = this.dataService.getScores();
  }

  displayedColumns: string[] = [];
  colToDisplayed: string[] = [];

  dataSource = this.scores;

  ngOnInit(): void {
    this.getScores();
    this.dataSource = this.scores;
    this.changeDetectorRefs.detectChanges();

    this.displayedColumns = this.dataService.getColScore();
    this.colToDisplayed = this.displayedColumns.slice();
    
    console.warn("Score data:", this.dataSource, "Displayed columns" , this.displayedColumns);
  }

}
