import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fk-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() countTask: number;
  @Input() pageSize: number;

  maxPage: number; 
  page: number;

  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.maxPage = this.countTask / this.pageSize;
    

    this.activateRoute.params
      .subscribe(params => {
        this.page = parseInt(params.page);
      });
  }


  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
