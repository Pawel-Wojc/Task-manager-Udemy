import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { dummyTasks } from './dummy-tasks';
import { Task } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';
import {newTask} from './new-task/new-task.model';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {


  isAddingTask = false;
  onStartAddTask() {
    this.isAddingTask = true;
  }
  onCancelAddTask() {
    this.isAddingTask = false;
  }

  @Input({ required: true }) userId !: string;
  @Input({ required: true }) name!: string;

  tasks: Task[] = dummyTasks;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }
  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  onAddTask(newtask : newTask) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: newtask.title,
      summary: newtask.summary,
      dueDate: newtask.date
    })

    this.isAddingTask = false
  }

}
