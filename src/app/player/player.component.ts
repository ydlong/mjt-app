import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl ,FormGroup} from '@angular/forms';
import { PLAYERS } from '../mock-players';
import { Player } from '../player';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})




export class PlayerComponent implements OnInit {

  playername = new FormControl('');

  id : string;
  pname: string;
  dice_num: number;
  
  constructor(private elementRef: ElementRef) {
    console.log(this.playername.value);

    this.id = this.elementRef.nativeElement.getAttribute('id');
    this.pname =  "";
    this.dice_num = 0;
    
    let myObj:Player  = this.getPlayersById(this.id);
    this.pname = myObj.name;
    this.playername.setValue( this.pname );
    
    //console.log(PLAYERS);

   }

  getPlayersById (pid:string): Player {
    let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
    return myObj;
  }
   

  rollDice(): void {
      let pid = this.id;
      let cid = this.dice_num;

      let myPlayer: Player = this.getPlayersById(pid);

      function checkDicNum (pid:string, cid:number) : boolean {
        // Loop PLAYERS to verify duplicated dice num
        PLAYERS.forEach( (element) => {
          if (element.dice_num == cid){}
      });
        return true;
      }

      setTimeout(function () {
          var randomNumber1:number = Math.floor(Math.random() * 6) + 1;
          var randomNumber2:number = Math.floor(Math.random() * 6) + 1;

          cid = randomNumber1+randomNumber2;
          let same_num: boolean =  checkDicNum (pid, cid);
          // if same_num ===-true re-dice
          myPlayer.dice_num = cid;
          console.log(PLAYERS);
          
      }, 2500);

  }


  ngOnInit(): void {
    this.playername.valueChanges.subscribe(selectedValue => {

       let myObj:Player = this.getPlayersById(this.id);
       myObj.name = this.playername.value;

       console.log(PLAYERS);
    });
  }

}
