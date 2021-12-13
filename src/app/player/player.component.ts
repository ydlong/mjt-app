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

  id : string = this.elementRef.nativeElement.getAttribute('id');
  pname: string = "";
  dice_num: number = 0;
  
  playername = new FormControl('');

  constructor(private elementRef: ElementRef) {}

  getPlayersById (pid:string): Player {
    let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
    return myObj;
  }
   
  /*
  runDice (): number {
    var randomNumber1:number = Math.floor(Math.random() * 6) + 1;
    var randomNumber2:number = Math.floor(Math.random() * 6) + 1;
    return randomNumber1+randomNumber2;
  } */
  setDicenum( dnum: number){
    this.dice_num=dnum;
  }

  rollDice(): void {
      let pid = this.id;
      let cid = this.dice_num;
      let myPlayer: Player = this.getPlayersById(pid);

      function checkDicNum (pid:string, cid:number) : {dup:boolean, zero:boolean} {
        let vdup = false;
        let vzero = false;
        // Loop PLAYERS to verify duplicated dice num
        PLAYERS.forEach( (element) => { 
          if (element.dice_num == cid && element.id!==pid){
            vdup = true;
          }

          if (element.dice_num == 0){
            vzero = true;
          }
        }
      );
        return {dup:vdup, zero:vzero};
      }

      
      function runDice (): number {
        var randomNumber1:number = Math.floor(Math.random() * 6) + 1;
        var randomNumber2:number = Math.floor(Math.random() * 6) + 1;
        return randomNumber1+randomNumber2;
      }      
      
      setTimeout(function () {

          cid = runDice();
          
          let chk :{dup:boolean, zero:boolean} =  checkDicNum (pid, cid);
          let same_num: boolean =  chk.dup;
          let zero_num: boolean = chk.zero;
          chk = checkDicNum(pid, cid);
          console.log(same_num, zero_num);

          if (same_num ===true){
            // display dice
            
          } else {
            myPlayer.dice_num = cid;
            
            // hide dice
            // display number
            chk = checkDicNum(pid, cid);
            zero_num = chk.zero;
            if (zero_num === false){ // asign wind

              // hide number, display wind
              let ewind = PLAYERS.reduce((max, obj) => (max.dice_num > obj.dice_num) ? max : obj);
              console.log(ewind);
            } 
          }

          console.log(same_num, PLAYERS);
          
      }, 2000);

  }


  ngOnInit(): void {

    // Change name listner
    this.playername.valueChanges.subscribe(selectedValue => {
       let myObj:Player = this.getPlayersById(this.id);
       myObj.name = this.playername.value;

       console.log(PLAYERS);
    });

    let myObj:Player  = this.getPlayersById(this.id);
    this.pname = myObj.name;
    this.playername.setValue( this.pname );  

  }

}
