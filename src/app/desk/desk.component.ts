import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GAMES } from '../games';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})


export class DeskComponent implements OnInit {

  constructor() { }

  id: string = "";
  name: string =""; 
  dice_num: number = 0;
  dice_run: boolean = false;
  game_wind: string = "";
  ewind_player: number = 0;
  deal_player: number = 0;

  

  rollDice(): void {

    const dp: string[] = ["^","<","v",">"];

    let randomNumber1:number = Math.floor(1+Math.random() * 6) ;
    let randomNumber2:number = Math.floor(1+Math.random() * 6) ;
    //console.log(randomNumber1,randomNumber2);
    let diceNum = randomNumber1+randomNumber2;
    this.dice_num = diceNum;
    this.dice_run = true;
    let game:Game = GAMES[GAMES.length-1];
    game.dice_num = diceNum;

    let dealEle = (<HTMLElement>document.getElementById("deal"));
    let diceEle = (<HTMLElement>document.getElementById("dice"));
    diceEle.style.display = "none";
    dealEle.style.display = "";
    let dpEle = (<HTMLElement>document.getElementById("dealpointer"));
    let dpidx = 0;
    if (diceNum%4==0){
      dpidx = diceNum%4 + game.ewind_player;
    } else {
      dpidx = diceNum%4-1 + game.ewind_player;
    }
    dpEle.innerText = dp[dpidx];
    

    console.log(dpidx, dpEle, GAMES);
  };

  ngOnInit(): void {
    let currGame:Game  =  GAMES[GAMES.length-1];
    this.id = currGame.id;
    this.name = currGame.name;
    this.dice_num = currGame.dice_num;
    this.dice_run = currGame.dice_run;
    this.game_wind = currGame.game_wind;
    this.ewind_player = currGame.ewind_player;
    this.deal_player = currGame.deal_player;
  };

}
