// npm install --save rxjs-compat
import { Component, OnInit } from '@angular/core';


import { interval, timer } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { pairs } from 'rxjs/observable/pairs';

const foo = [1,2,3];
const foo2 = { a: 1, b: 2};

@Component({
  selector: 'fk-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // of(1,2,3)
    //   .subscribe( value => {
    //     console.log('of: ', value); // // 1 2 3 
    // });

    // from(foo)
    //   .subscribe( value => {
    //     console.log('from: ', value); // // 1 2 3 
    //   });

    //   pairs(foo)
    //     .subscribe( value => {
    //       console.log('pairs: ', value); // [a,1] [b,2] |
    //   });

    // interval
    // interval(1000)
    //   .subscribe( _ => {
    //     console.log(true)
    //   });

    // timer 
    timer(5000)
      .subscribe( i => console.log('foo'));
    // timer mit interval
    // timer(5000, 1000)
    //   .subscribe( i => console.log('foo'));

  }

}
