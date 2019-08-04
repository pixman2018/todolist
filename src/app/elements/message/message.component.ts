import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef} from "@angular/material";


import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'fk-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

  // @Input() message;
  // @Input() error;

  constructor(
    @Inject(MAT_DIALOG_DATA) public message,
    public dialogRef: MatDialogRef<MessageComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    timer(2000).subscribe( i => {
      this.onClose();
      this.router.navigate(this.message.redirect);
    });
  }

  onClose() {
    this.dialogRef.close('Cance');
  }

}
