import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})


export class PlayerComponent implements OnInit {

  id : string;
  name: string;

  constructor(private elementRef: ElementRef) {
    this.id = this.elementRef.nativeElement.getAttribute('id');
    this.name =  "Name";
   }



  ngOnInit(): void {

  }

}
