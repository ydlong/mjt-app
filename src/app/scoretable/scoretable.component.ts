import { Component, NgModule, OnInit } from "@angular/core";
import { Score } from '../score';
import { DataService } from '../dataService';
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-scoretable',
    templateUrl: './scoretable.component.html',
    styleUrls: ['./scoretable.component.css']
})


export class ScoretableComponent implements OnInit {
    constructor(private dataService: DataService) { }

    scores: Score[] = [];
    getScores(): void {
        this.scores = this.dataService.getScores();
    }

    dataSource = new MatTableDataSource<Score>(this.scores);

    displayedColumns: string[] = [];
    colHeaderToDisplayed: String[] = [];
    tblDef: Array<any> = [];

    /*
    refresh():void{
        this.getScores();
        this.dataSource = new MatTableDataSource<Score>(this.scores);
        console.warn(this.dataSource.data);
    }*/

    ngOnInit() {

        this.getScores();
        this.dataSource = new MatTableDataSource<Score>(this.scores);

        this.displayedColumns = this.dataService.getColScore();
        this.tblDef = this.dataService.getTableDef();
        this.colHeaderToDisplayed = this.displayedColumns.slice();

        console.log(this.dataService)
    }
}