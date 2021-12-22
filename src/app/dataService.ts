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

    ColScore = ['round_id','game_id', 'p1_m', 'p2_m', 'p3_m', 'p4_m'];

    getGames():Game[] {
        return GAMES;
    }

    getPlayers():Player[] {
        return PLAYERS;
    }

    getScores():Score[] {
        return SCORES;
    }

    getColScore():string[] {
        return this.ColScore;
    }

}