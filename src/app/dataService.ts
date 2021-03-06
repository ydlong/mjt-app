import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Game } from "./game";
import { GAMES } from "./games";
import { Player } from "./player";
import { PLAYERS } from "./players";
import { Score } from "./score";
import { SCORES } from "./scores";

@Injectable({
    providedIn: 'root',
})


export class DataService {


    //Game status
    getGames():Game[] {
        return GAMES;
    }

    getPlayers():Player[] {
        return PLAYERS;
    }

    getScores():Score[] {
        return SCORES;
    }

    //Score table columnzs
    ColScore = ['round_id','game_id', 'p1_m', 'p2_m', 'p3_m', 'p4_m'];
   
    //Score table Headers for columns
    tableDef: Array<any> = [
        { key: 'p1_m',
          header: 'Player 1',
          className: '' ,
          formCol: true }, 
        { key: 'p2_m',
          header: 'Player 2',
          className: '' ,
          formCol: true  },    
        { key: 'p3_m',
          header: 'Player 3',
          className: '' ,
          formCol: true},    
        { key: 'p4_m',
          header: 'Player 4',
          className: '' ,
          formCol: true},    
        { key: 'round_id',
          header: 'Round',
          className: '' ,
          formCol: false }, 
        { key: 'game_id',
          header: 'Game',
          className: ''  ,
          formCol: false},
      ];



    getColScore():string[] {
        return this.ColScore;
    }

    getTableDef():Array<any>[] {
        return this.tableDef;
    }
}