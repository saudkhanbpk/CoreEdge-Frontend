import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  constructor() {
    // Connect to the WebSocket server
    this.socket = io('http://localhost:3000'); 
  }

  // Listen to invoice notifications
  listenToInvoiceNotifications(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('new_invoice_notification', (message: string) => {
        observer.next(message); 
      });
    });
  }

  // Optionally: Disconnect the socket when no longer needed
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
