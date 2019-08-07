import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fk-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() allTask: number;
  @Input() pageSize: number;

  maxPage: number; 
  currentPage: number;
  maxButton: number = 6;
  buttomWidth: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.maxPage = Math.floor(this.allTask / this.pageSize);

    sessionStorage.setItem('maxTaskPage', this.maxPage.toString());

    this.activateRoute.params
      .subscribe(params => {
        this.currentPage = parseInt(params.page);
      });

      this.getButtomWith();
      
  }


  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
      if (this.maxButton + 1 === i) {
        break;
      } else {
        items.push(i);
      }
    }
    return items;
  }

  getButtomWith() {
    const buttonCount = (this.maxButton > this.maxPage) ? this.maxPage + 4 : this.maxButton + 4;
    this.buttomWidth = 100/ buttonCount + '%';
  }

}
