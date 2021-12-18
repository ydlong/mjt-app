import { Component, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import { FormControl ,FormGroup} from '@angular/forms';
import { PLAYERS } from '../mock-players';
import { Player } from '../player';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})


export class PlayerComponent implements OnInit ,AfterViewInit {

  id : string = this.elementRef.nativeElement.getAttribute('id');
  pname: string = "";
  dice_num: number = 0;
  curr_wind: string ="?";
  
  playername = new FormControl('');


  constructor(private elementRef: ElementRef) {}

  getPlayersById (pid:string): Player {
    let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
    return myObj;
  }
   
  setDicenum( dnum: number){
    this.dice_num=dnum;
  }


  rollDice(): void {
      let pid = this.id;
      let cid = this.dice_num;
      let myPlayer: Player = this.getPlayersById(pid);
      let winds: string[] = ["E","S","W","N"]

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
        var randomNumber1:number = Math.floor(1+Math.random() * 6) ;
        var randomNumber2:number = Math.floor(1+Math.random() * 6) ;
        console.log(randomNumber1,randomNumber2);
        return randomNumber1+randomNumber2;
      }      

      function assignWind(pwind:string):void {
        //let windObj:Player = PLAYERS.find(e => e.id === pwind)!;

        let curridx:number = +pwind.substring(2,1)-1;

        while (winds[curridx]!="E"){
          let ele:number = 3;
          let to:number = 0;
          winds.splice(to,0, winds.splice(ele,1)[0]);
        }
        
        PLAYERS.forEach(function (p,idx) {
          p.curr_wind=winds[idx];
          let pEle = (<HTMLElement>document.getElementById("wind_p"+(idx+1)));
          pEle.childNodes[1].textContent = winds[idx];
         // console.log(pEle.childNodes[1].textContent, "wind_p"+(idx+1));
        }); 

        
      }
      
      //setTimeout(function () {

          cid = runDice();
          
          let chk :{dup:boolean, zero:boolean} =  checkDicNum (pid, cid);
          let same_num: boolean =  chk.dup;
          let zero_num: boolean = chk.zero;
          chk = checkDicNum(pid, cid);
          //console.log(same_num, zero_num);

          if (same_num ===true){
            // display dice
            
          } else {
            myPlayer.dice_num = cid;
            
            // hide dice
            let cEle = (<HTMLElement>document.getElementById("c_"+pid));
            cEle.style.display="none";
            // display number
            let dEle = (<HTMLElement>document.getElementById("d_"+pid));
            console.log("d_"+pid, dEle.textContent);
            dEle.textContent = cid+"";

            chk = checkDicNum(pid, cid);
            zero_num = chk.zero;
            if (zero_num === false){ // asign wind
              // hide number, display wind
              let ewind = PLAYERS.reduce((max, obj) => (max.dice_num > obj.dice_num) ? max : obj);
              console.log("ewindid: ",ewind.id);
              assignWind(ewind.id);
            } 
          }

          //console.log(same_num, PLAYERS);
          
      //}, 2000);
      
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
    this.curr_wind = myObj.curr_wind;

  }

  ngAfterViewInit(): void {
    console.log(this.curr_wind);
    
  }



}
