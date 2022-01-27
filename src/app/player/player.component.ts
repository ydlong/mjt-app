import { Component, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import { FormControl ,FormGroup} from '@angular/forms';
import { PLAYERS } from '../players';
import { Player } from '../player';
import { GAMES } from '../games';
import { DataService } from '../dataService';


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

  constructor(private elementRef: ElementRef, private dataService: DataService) {}

  colScores:string[] = this.dataService.ColScore;

  players: Player[] = [];
  getPlayers() : void {
    this.players = this.dataService.getPlayers();
  }

  tblDef: Array<any> =[];
  getTblDef():void{
    this.tblDef = this.dataService.getTableDef();
  }

  getPlayersById (pid:string): Player {
    let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
    return myObj;
  }

  setTblPlayersById (pid:string, pname:string): void  {
    let myObj = this.tblDef.find(e => e.key === pid)!;
    myObj.header = pname;
    console.warn(pid, myObj);
  }  
   
  setDicenum( dnum: number){
    this.dice_num=dnum;
  }


  rollDice( ): void {
      let pid = this.id;
      let cid = this.dice_num;
      let d_run = this.dice_run;

      let myPlayer: Player = this.getPlayersById(pid);
      let winds: string[] = ["E","S","W","N"]

      let players: Player[] = this.players;

      function checkDicNum (pid:string, cid:number) : {dup:boolean, run:boolean} {
        let vdup = false;
        let run = true;

        // Loop PLAYERS to verify duplicated dice num and run status
        
        players.forEach( (element) => { 
          
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
        
        players.forEach(function (p,idx) {
          p.curr_wind=winds[idx];
          let pEle = (<HTMLElement>document.getElementById("wind_p"+(idx+1)));
          pEle.childNodes[1].textContent = winds[idx];
        }); 

        let game = GAMES[GAMES.length-1];
        game.ewind_player = curridx;

      }
      
      if (!d_run){

        setTimeout( function () {

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
                const maxDiceNum = Math.max.apply(Math, players.map(function(o) { return o.dice_num; }));
                let dupEles:number[] = [];

                for (let index = 0; index < players.length; index++) {
                  if (players[index].dice_num === maxDiceNum) {
                    dupEles.push(index);
                  }
                }

                console.log("Max number as same players: ", dupEles.indexOf(maxDiceNum));

                if (dupEles.length>1){
                    dupEles.forEach(function(p,i){
                      if(players[p].dice_num==maxDiceNum){
                      console.log("c_p"+(p+1));
                      players[p].dice_run = false;
                      let cEle = (<HTMLElement>document.getElementById("c_p"+(p+1)));
                      cEle.style.display="";
                      }
                    });
                
                } else {
                  let ewind = players.reduce((max, obj) => (max.dice_num > obj.dice_num) ? max : obj);
                  assignWind(ewind.id);
                  // display desk dice
                }

              //console.log("Max number: ",maxDiceNum,  "Same number players: ", dupEles, "All diced: ", all_run,  "Plays data: ", PLAYERS);

            }
          
        }, 1000);  
    }
}



  ngOnInit(): void {

    this.getPlayers();
    this.getTblDef();

    // Change name listner
    this.playername.valueChanges.subscribe(selectedValue => {
       let playerObj:Player = this.getPlayersById(this.id);
       playerObj.name = this.playername.value;
       let pid = this.id+"_m";
       let tblObj = this.tblDef.find(e => e.key === pid)!;
       tblObj.header = playerObj.name;     
    });

    let playerObj:Player  = this.getPlayersById(this.id);
    this.pname = playerObj.name;
    this.playername.setValue( this.pname );  
    this.curr_wind = playerObj.curr_wind;
    this.dice_run = playerObj.dice_run;
  }

  ngAfterViewInit(): void {
    //console.log(this.curr_wind);
    
  }



}
