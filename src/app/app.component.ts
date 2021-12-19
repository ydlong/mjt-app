import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Game } from './game';
import { GAMES } from './games';

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
  }
  title = 'mjt-app';

  
}
