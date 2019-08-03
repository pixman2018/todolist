import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'fk-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public deleteMessage: any) {
    const name = this.deleteMessage.content.replace(/___name___/, this.deleteMessage.name);
    this.deleteMessage.content = name;
   }

  ngOnInit() {
  }

}
