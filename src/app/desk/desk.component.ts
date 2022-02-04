import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { DataService } from '../dataService';
import { Game } from '../game';
import { Score } from '../score';
import { ScoreComponent } from '../score/score.component';
import { AppService } from '../app.services';
import { GAMES } from '../games';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})


export class DeskComponent implements OnInit {

  @Input() msg='';

  constructor( private dataService: DataService, 
               private appService:AppService ) { }

  id: string = "";
  name: string =""; 
  dice_num: number = 0;
  dice_run: boolean = false;
  game_wind: string = "";
  ewind_player: number = 0;
  deal_player: number = 0;

  games:Game[] = [];
  scores: Score[] = [];

  getGames(): void {
    this.games = this.dataService.getGames();
  }

  getScores():void{
    this.scores = this.dataService.getScores();
  }

  addScore(rid:number, gid:number):void{
    this.getScores();
    let newScore: Score =  {round_id: rid,  game_id: gid,  p1_m: 0, p2_m: 0, p3_m: 0, p4_m: 0 };
    this.scores.push(newScore);
    this.appService.sendScoreChangeEvent();  // refresh score table
  }
  
  // Roll to pick where to start deal
  rollDice(): void {

    const dp: string[] = ["^","<","v",">"];

    let randomNumber1:number = Math.floor(1+Math.random() * 6) ;
    let randomNumber2:number = Math.floor(1+Math.random() * 6) ;
    //console.log(randomNumber1,randomNumber2);
    let diceNum = randomNumber1+randomNumber2;
    this.dice_num = diceNum;
    this.dice_run = true;
    let game:Game = this.games[this.games.length-1];
    game.dice_num = diceNum;

    let dealEle = (<HTMLElement>document.getElementById("deal"));
    let diceEle = (<HTMLElement>document.getElementById("dice"));
    diceEle.style.display = "none";
    dealEle.style.display = "";
    let dpEle = (<HTMLElement>document.getElementById("dealpointer"));

    let dpidx =  (game.ewind_player+diceNum-1)%4  ;
          
    dpEle.innerText = dp[dpidx];
    
    if (this.scores.length===0){
      this.addScore( 0, 0 );
    }
  };

  nxtGame(): void {
    console.log("Current game: ", GAMES)

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

    function changePlayerWind(){

    }
    
     // 1. change wind for players
    let gwwind:string = nxtWind(this.game_wind); 

    // 2. init new game
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

    this.addScore(0, gname-1);
    
    console.log("New game:", gwwind, newGame);

  }


  ngOnInit(): void {
    this.getGames();
    this.getScores();

    let currGame:Game  =  this.games[this.games.length-1];
    this.id = currGame.id;
    this.name = currGame.name;
    this.dice_num = currGame.dice_num;
    this.dice_run = currGame.dice_run;
    this.game_wind = currGame.game_wind;
    this.ewind_player = currGame.ewind_player;
    this.deal_player = currGame.deal_player;

    //console.warn(this.msg);
  };

}
