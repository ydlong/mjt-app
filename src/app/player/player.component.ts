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
  dice_run: boolean = false;

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
      let d_run = this.dice_run;

      let myPlayer: Player = this.getPlayersById(pid);
      let winds: string[] = ["E","S","W","N"]

      function checkDicNum (pid:string, cid:number) : {dup:boolean, run:boolean} {
        let vdup = false;
        let run = true;

        // Loop PLAYERS to verify duplicated dice num and run status
        PLAYERS.forEach( (element) => { 
          
          if (element.dice_num == cid && element.id!==pid){
            vdup = true;
          }

          if (element.dice_run === false){
            run = false;           
          } 

          if ( vdup==true || run == false){
            return false;
          } else {
            return true;
          }
          
        }
      );
        return {dup:vdup, run:run};
      }

      
      function runDice (): number {
        var randomNumber1:number = Math.floor(1+Math.random() * 6) ;
        var randomNumber2:number = Math.floor(1+Math.random() * 6) ;
        //console.log(randomNumber1,randomNumber2);
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
        }); 

      }
      
      if (!d_run){
        setTimeout(function () {

          cid = runDice();
          
          let chk :{dup:boolean, run:boolean} =  checkDicNum (pid, cid);
          let same_num: boolean =  chk.dup;
          let all_run: boolean = chk.run;

          chk = checkDicNum(pid, cid);
          //console.log(same_num, zero_num);

            myPlayer.dice_num = cid;
            myPlayer.dice_run = true;

            // hide dice
            let cEle = (<HTMLElement>document.getElementById("c_"+pid));
            cEle.style.display="none";
            // display number
            let dEle = (<HTMLElement>document.getElementById("d_"+pid));
            
            dEle.textContent = cid+"";

            // Assign winds
            chk = checkDicNum(pid, cid);
            all_run = chk.run;

            if (all_run === true){ // asign wind

                // display dup players dice
                const maxDiceNum = Math.max.apply(Math, PLAYERS.map(function(o) { return o.dice_num; }));
                let dupEles:number[] = [];

                for (let index = 0; index < PLAYERS.length; index++) {
                  if (PLAYERS[index].dice_num === maxDiceNum) {
                    dupEles.push(index);
                  }
                }

                console.log("Max number as same players: ", dupEles.indexOf(maxDiceNum));

                if (dupEles.length>1){
                    dupEles.forEach(function(p,i){
                      if(PLAYERS[p].dice_num==maxDiceNum){
                      console.log("c_p"+(p+1));
                      PLAYERS[p].dice_run = false;
                      let cEle = (<HTMLElement>document.getElementById("c_p"+(p+1)));
                      cEle.style.display="";
                      }
                    });
                
                } else {
                  let ewind = PLAYERS.reduce((max, obj) => (max.dice_num > obj.dice_num) ? max : obj);
                  assignWind(ewind.id);
                }

              console.log("Max number: ",maxDiceNum,  "Same number players: ", dupEles, "All diced: ", all_run,  "Plays data: ", PLAYERS);

            }
          
        }, 1000);  
    }
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
    this.dice_run = myObj.dice_run;
  }

  ngAfterViewInit(): void {
    console.log(this.curr_wind);
    
  }



}
