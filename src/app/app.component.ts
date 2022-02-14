import { AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { DataService } from './dataService';
import { Game } from './game';
import { Score } from './score';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit{
  constructor(private elementRef:ElementRef, 
              private dataService:DataService
              ){}

  /** get data **/
  games:Game[] =[];
  getGames(): void {
    this.games = this.dataService.getGames();
  }

  scores:Score[] = [];
  getScores(): void {
    this.scores = this.dataService.getScores();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor="darkblue";
  }

  ngOnInit(): void {   
    // Initialize new game
    //this.getGames();
    //let newGame:Game =  {id:"g1", name:"1", game_wind:"E", dice_num:0, dice_run:false, ewind_player: -99, deal_player: -99};
    //this.games.push(newGame);

    this.testMsg="Something else."
  }
  title = 'mjt-app';

  testMsg ="";
  
}
