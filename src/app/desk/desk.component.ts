import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { DataService } from '../dataService';
import { Game } from '../game';
import { Score } from '../score';
import { ScoreComponent } from '../score/score.component';
import { AppService } from '../app.services';
import { GAMES } from '../games';
import { Player } from '../player';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Subscription } from 'rxjs';

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
  players: Player[] = [];
  scores: Score[] = [];

  ewindPlayerSetEventsubscription!: Subscription;

  getGames(): void {
    this.games = this.dataService.getGames();
  }

  getPlaysrs():void {
    this.players = this.dataService.getPlayers();
  }

  getScores():void{
    this.scores = this.dataService.getScores();
  }

  addScore(rid:string, gid:number):void{
    this.getScores();
    let newScore: Score =  {round_id: rid,  game_id: gid,  p1_m: 0, p2_m: 0, p3_m: 0, p4_m: 0 };
    this.scores.push(newScore);
    this.appService.sendScoreChangeEvent();  // refresh score table
  }

  addNewGame(g:Game):void {
    this.games.push(g);
  }
  

  showHideDice(show:boolean):void {
    //console.warn("show hide dice: ", show);
    let dealEle = (<HTMLElement>document.getElementById("deal"));
    let diceEle = (<HTMLElement>document.getElementById("dice"));
    let dealPTEle = (<HTMLElement>document.getElementById("dealpointer"));
    let dealDiceNum = (<HTMLElement>document.getElementById("deal_dice_num"));

    if (show){
      diceEle.style.display = "";
      dealDiceNum.style.display = "";
      dealPTEle.style.display = "none";
      dealEle.style.display = "none";
    } else {
      diceEle.style.display = "none";
      dealDiceNum.style.display = "none";
      dealPTEle.style.display = "";
      dealEle.style.display = "";
    }
  }

  // Roll to pick where to start deal
  rollDice(): void {

        const dp: string[] = ["^","<","v",">"];

        let randomNumber1:number = Math.floor(1+Math.random() * 6) ;
        let randomNumber2:number = Math.floor(1+Math.random() * 6) ;
        
        let diceNum = randomNumber1+randomNumber2;
        this.dice_num = diceNum;
        this.dice_run = true;

        let game: Game = this.games[this.games.length-1];
        this.dice_num = diceNum;
        game.dice_run = this.dice_run;
        game.dice_num = this.dice_num;

        let dealEle = (<HTMLElement>document.getElementById("deal"));
        let diceEle = (<HTMLElement>document.getElementById("dice"));
        diceEle.style.display = "none";
        dealEle.style.display = "";
        let dpEle = (<HTMLElement>document.getElementById("dealpointer"));
        dpEle.style.display = "";
        let dpidx =  (game.ewind_player+diceNum-1)%4  ;
              
        dpEle.innerText = dp[dpidx];
        
        this.deal_player = dpidx;
        game.deal_player = this.deal_player;

        if (this.scores.length===0){
          this.addScore( this.game_wind, 1 );
        }

    let msgTxtEle = (<HTMLElement>document.getElementById("promtxt"));
    msgTxtEle.innerText = "";
    let newGame = (<HTMLElement>document.getElementById("nxtgame"));
    newGame.style.display = "";
        
  };



    nxtGame(): void {
        let nxtGame = (<HTMLElement>document.getElementById("nxtgame"));
        nxtGame.style.display = "none";
        let msgTxtEle = (<HTMLElement>document.getElementById("promtxt"));
        msgTxtEle.innerText = "Please roll dice to pick deal start."

        // change wind
        function nxtWind (currWind:string) : string{
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

        function shiftEwindPlayer(pArr:Player[]):Player[]{
            let currWindArr:string[] = pArr.map(({ curr_wind}) => curr_wind);
            currWindArr.unshift(currWindArr.pop()+"");

            pArr.forEach(function (p, idx){
              p.curr_wind=currWindArr[idx];
              let pEle = (<HTMLElement>document.getElementById("wind_p"+(idx+1)));
              pEle.childNodes[1].textContent = currWindArr[idx];
            });
            return pArr;
        }
    
        // 1. shift player's wind
        this.players = shiftEwindPlayer(this.players);
        var ewp_idx = this.players.findIndex(p => p.curr_wind == "E");
        console.warn(ewp_idx, this.players);

        // 2. init new game
        let gname:number = +this.name +1;
        let gid:string = "g"+gname;
        let gdealPlayer:number = -99;

        let gwwind:string = this.game_wind;
        // check if need to change gwind
        if (gname>4 && gname%4===1){
          gwwind = nxtWind(this.game_wind); 
        }

        // 3. enable dice 
        this.dice_num = 0;
        this.showHideDice(true);
        /*
        if(this.deal_player<3){
          gdealPlayer = this.deal_player+1;
        } else {
          gdealPlayer = 0;
        } */

    
        let newGame:Game =  {id:gid, name: gname.toString(), game_wind: gwwind, dice_num:0, dice_run:false, ewind_player: ewp_idx, deal_player: gdealPlayer};
        this.id = gid;
        this.name = gname.toString();
        this.game_wind = gwwind;
        this.deal_player = gdealPlayer;

        this.addScore(this.game_wind, gname);
        this.addNewGame(newGame);
       

  }

  ewindPlayerSet():void{
    this.showHideDice(true);
    let msgTxtEle = (<HTMLElement>document.getElementById("promtxt"));
    msgTxtEle.innerText = "Please roll dice to pick deal start."

  }

  ngOnInit(): void {

        this.getGames();
        let newGame: Game =  {id:"g1", name:"1", game_wind:"E", dice_num:0, dice_run:false, ewind_player: -99, deal_player: -99};
        this.games.push(newGame);
       
        this.getScores();
        this.getPlaysrs();

        let currGame:Game  =  this.games[this.games.length-1];
        this.id = currGame.id;
        this.name = currGame.name;
        this.dice_num = currGame.dice_num;
        this.dice_run = currGame.dice_run;
        this.game_wind = currGame.game_wind;
        this.ewind_player = currGame.ewind_player;
        this.deal_player = currGame.deal_player;

        this.ewindPlayerSetEventsubscription = this.appService.getEwindPlayerSetEvent().subscribe( ()=> {
          this.ewindPlayerSet();
        });

  };

}
