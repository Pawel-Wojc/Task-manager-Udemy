import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.status = 'closed';
      }
      return ticket;
    });
  }

  onAdd(tickerData: { title: string; request: string }) {
    const newTicket: Ticket = {
      id: Math.random().toString(),
      title: tickerData.title,
      request: tickerData.request,
      status: 'open',
    };

    this.tickets.push(newTicket);
  }
}
