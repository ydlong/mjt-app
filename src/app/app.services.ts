
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AppService {
    //isAddData: boolean;
    isAddDataChange: Subject<boolean> = new Subject<boolean>();


    sendClickEvent() {
        this.isAddDataChange.next(true);
      }


    getClickEvent(): Observable<any>{ 
        return this.isAddDataChange.asObservable();
    }

}