import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl ,FormGroup} from '@angular/forms';
import { PLAYERS } from '../mock-players';
import { Player } from '../player';

//declarations: []
//imports: [FormGroup]

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})




export class PlayerComponent implements OnInit {

  playername = new FormControl('');

  id : string;
  pname: string;

  
  constructor(private elementRef: ElementRef) {
    console.log(this.playername.value);

    this.id = this.elementRef.nativeElement.getAttribute('id');
    this.pname =  "";
    
    function getPname(pobj: Player) {
      return pobj.name;
    }

    let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
    this.pname = getPname(myObj);

    this.playername.setValue( this.pname );
    
    //console.log(PLAYERS);


   }


  ngOnInit(): void {

    function setPname(pobj: Player, setname:string ):void{
      pobj.name = setname;
    }

    this.playername.valueChanges.subscribe(selectedValue => {
       //console.log(selectedValue);
       console.log(this.playername.value, this.id);

       let myObj:Player = PLAYERS.find(e => e.id === this.id)!;
       setPname(myObj, this.playername.value) ;
       console.log(PLAYERS);
    });
  }

}
