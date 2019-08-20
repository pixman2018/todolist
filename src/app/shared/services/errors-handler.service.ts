import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  constructor() { }

  getResponseError(error, actionMethod, ServiceMethod) {
    let errorMessage: string = `Bei Aufruf der Service-Methode "${ServiceMethod}" innerhalb der Methode "${actionMethod}" ist der Fehler  `;
    switch (error.status) {
      case 404:
        errorMessage = errorMessage + '"Der Endpunkt wurde nicht gefunden!" aufgetreten. ';
        break;
      case 500:
        errorMessage = errorMessage + '"Server-Fehler beim laden der Task!" aufgetreten.';
        break;
      default:
        errorMessage = errorMessage + '"Irgendetwas anderes wirft einen Fehler!" aufgetreten ';
    }
    console.error(errorMessage, error);
  }
}
