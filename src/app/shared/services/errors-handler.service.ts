import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  constructor() { }

  getResponseError(error) {
    switch (error.status) {
      case 404:
        console.error('Der Endpunkt wurde nicht gefunden! ', error);
        break;
      case 500:
        console.error('Server-Fehler beim laden der Task! ', error);
        break;
      default:
        console.error('Irgendetwas anderes wirft einen Fehler! ', error)
    }
  }
}
