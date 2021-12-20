import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game';
import { GAMES } from '../games';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})


export class DeskComponent implements OnInit {

  @Input() msg='';

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

  nxtGame(): void {

    // change wind
    function nxtWind (currWind:string){
      let winds: string[] = ["E","S","W","N"];
      let currWindIdx = winds.indexOf(currWind);
      let rtWind:string = "";

      if (currWindIdx<3){
        rtWind = winds[currWindIdx+1];
      } else {
        rtWind = winds[0];
      }
      return rtWind;
    }

    let gwwind:string = nxtWind(this.game_wind);  

    // init new game
    let gname:number = +this.name +1;
    let gid:string = "g"+gname;
    let gdealPlayer:number = 0;

    if(this.deal_player<3){
      gdealPlayer = this.deal_player+1;
    } else {
      gdealPlayer = 0;
    }

    
    let newGame:Game =  {id:gid, name: gname.toString(), game_wind: gwwind, dice_num:0, dice_run:false, ewind_player: 0, deal_player: gdealPlayer};
    this.id = gid;
    this.name = gname.toString();
    this.game_wind = gwwind;
    this.deal_player = gdealPlayer;
    console.log(gwwind, newGame);

  }


  ngOnInit(): void {
    let currGame:Game  =  GAMES[GAMES.length-1];
    this.id = currGame.id;
    this.name = currGame.name;
    this.dice_num = currGame.dice_num;
    this.dice_run = currGame.dice_run;
    this.game_wind = currGame.game_wind;
    this.ewind_player = currGame.ewind_player;
    this.deal_player = currGame.deal_player;

    console.warn(this.msg);
  };

}
