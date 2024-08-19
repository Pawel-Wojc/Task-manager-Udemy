import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
})
export class NewMessageComponent {
  private messagesService = inject(MessagesService);

  //add = output<string>();
  enteredText = signal('');
  //enteredText = '';
  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    //non signal way
    // this.messagesService.addMessage(this.enteredText);
    // this.enteredText = '';
    //signal way
    this.messagesService.addMessage(this.enteredText());
    this.enteredText.set('');
  }
}
