import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Game } from './game';
import { GAMES } from './games';
import { Score } from './score';
import { SCORES } from './scores';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit{
  constructor(private elementRef:ElementRef){}
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor="darkblue";
  }

  ngOnInit(): void {
      // Initialize new game
    let newGame:Game =  {id:"g1", name:"1", game_wind:"E", dice_num:0, dice_run:false, ewind_player: 0, deal_player: 0};
    GAMES.push(newGame);

    let newScore: Score =  {round_id: 0,  game_id: 0,  p1_m: 1, p2_m: -1, p3_m: 0, p4_m: 0 };
    SCORES.push(newScore);
  }
  title = 'mjt-app';

  
}
