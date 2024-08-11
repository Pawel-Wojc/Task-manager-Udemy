import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { newTask } from './new-task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Output() cancel = new EventEmitter();
  @Output() addTask = new EventEmitter<newTask>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  onCancelClick() {
    this.cancel.emit();
  }
  onSubmit() {
    this.addTask.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDueDate
    });
  }

}
