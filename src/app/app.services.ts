
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AppService {
    //isAddData: boolean;
    isScoresChange: Subject<boolean> = new Subject<boolean>();

    sendScoreChangeEvent() {
        this.isScoresChange.next(true);
      }

    getScoreChangeEvent(): Observable<any>{ 
        return this.isScoresChange.asObservable();
    }


    isPlayerChange: Subject<boolean> = new Subject<boolean>();
    sendPlayerChangeEvent(){
        this.isPlayerChange.next(true);
    }

    getPlayerChageEvent(){
        return this.isPlayerChange.asObservable();
    }

    isEwindPlayerSet: Subject<boolean> = new Subject<boolean>();
    sentEwindPlayerSetEvent(){
        this.isEwindPlayerSet.next(true);
    }
    getEwindPlayerSetEvent() {
        return this.isEwindPlayerSet;
    }
}