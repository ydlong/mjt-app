import { Component, OnInit } from '@angular/core';

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


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['p1_m', 'p2_m', 'p3_m', 'p4_m'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {

  }

}
