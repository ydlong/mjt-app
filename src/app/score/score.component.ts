import { Component, OnInit } from '@angular/core';
import { SCORES } from '../scores';

/*
export interface ScoreElement {
  round_id: number;
  game_id: number;
  p1_m: number;
  p2_m: number;
  p3_m: number;
  p4_m: number;
}

const ELEMENT_DATA: ScoreElement[] = [
  {round_id: 0,  game_id: 0,  p1_m: 1, p2_m: -1, p3_m: 0, p4_m: 0 },
  {round_id: 0,  game_id: 0,  p1_m: 2, p2_m: -1, p3_m: -1, p4_m: 0 }, 
  {round_id: 0,  game_id: 0,  p1_m: 2, p2_m: -2, p3_m: 0, p4_m: 0 }
];
*/

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit {

  constructor() { }

  round_id: number = 0 ;
  game_id: number = 0;
  p1_m: number = 0;
  p2_m: number = 0;
  p3_m: number = 0;
  p4_m: number = 0;

  displayedColumns: string[] = ['round_id','game_id', 'p1_m', 'p2_m', 'p3_m', 'p4_m'];
  dataSource = SCORES;

  ngOnInit(): void {

  }

}
