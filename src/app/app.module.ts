import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { DeskComponent } from './desk/desk.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    DeskComponent,
    ScoreComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }