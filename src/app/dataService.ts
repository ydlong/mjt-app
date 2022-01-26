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

    //Score Header
    ColScore = ['round_id','game_id', 'p1_m', 'p2_m', 'p3_m', 'p4_m'];
    ColPlayer = {"p1_m":"p1_m", "p2_m":"p2_m","p3_m":"p3_m","p4_m":"p4_m"}
    tableDef: Array<any> = [
        { key: 'p1_m',
          header: 'Player 1',
          className: '' }, 
        { key: 'P2_m',
          header: 'Play 2',
          className: ''},    
        { key: 'P3_m',
          header: 'Play 3',
          className: ''},    
        { key: 'P4_m',
          header: 'Play 4',
          className: ''},    
        { key: 'round_id',
          header: 'Round',
          className: '' }, 
        { key: 'game_id',
          header: 'Game',
          className: '' },
      ];

    getColScore():string[] {
        return this.ColScore;
    }

    getColPlays():any {
        return this.ColPlayer;
    }

    getTableDef():Array<any>[] {
        return this.tableDef;
    }
}