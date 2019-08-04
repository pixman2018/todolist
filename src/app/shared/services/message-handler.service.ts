import { Injectable } from '@angular/core';
import { MessageComponent } from 'src/app/elements/message/message.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(
    private messageDialog: MatDialog,
  ) { }

  chanceMessage( message, redirect) {

    this.messageDialog.open(MessageComponent, {
      data: { 
        title: message, 
        redirect: redirect 
      }
    });
  }
}
