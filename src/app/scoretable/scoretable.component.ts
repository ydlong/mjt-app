import { Component, NgModule, OnInit, ViewChild } from "@angular/core";
import { Score } from '../score';
import { DataService } from '../dataService';
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from '../app.services';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-scoretable',
    templateUrl: './scoretable.component.html',
    styleUrls: ['./scoretable.component.css']
})


export class ScoretableComponent implements OnInit {

    scorechangekEventsubscription!: Subscription;
    @ViewChild('scoresTable_1') scoreTable!: MatTable<any> ;

    constructor(private dataService: DataService,  private appService:AppService ) {}

    scores: Score[] = [];
    getScores(): void {
        this.scores = this.dataService.getScores();
    }

    dataSource = new MatTableDataSource<Score>(this.scores);

    displayedColumns: string[] = [];
    colHeaderToDisplayed: String[] = [];
    tblDef: Array<any> = [];


    /** Gets the total cost of all transactions. */
    getTotalCost(x:any) {
        console.warn(x);
        return this.scores.map(s => s.p1_m).reduce((acc:number, value:number) => Number(acc) + Number(value), 0);
    }    

    ngOnInit() {

        this.getScores();
        this.dataSource.data = this.scores;
        this.displayedColumns = this.dataService.getColScore();
        this.tblDef = this.dataService.getTableDef();
        this.colHeaderToDisplayed = this.displayedColumns.slice();


        this.scorechangekEventsubscription = this.appService.getScoreChangeEvent().subscribe(()=>{
            this.dataSource.data = this.scores;
            this.scoreTable.renderRows();
        });

        console.log(this.dataService)
    }
}