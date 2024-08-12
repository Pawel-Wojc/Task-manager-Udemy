import { dummyTasks } from './dummy-tasks';
import { Task } from './task/task.model';
import { newTask } from './new-task/new-task.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TasksService {
    private tasks: Task[] = dummyTasks;

    constructor () {
        const tasks = localStorage.getItem('tasks') 
        if(tasks){
            this.tasks = JSON.parse(tasks)
        }
    }

    getUserTasks(userId: string) {
        return this.tasks.filter((task) => task.userId === userId)
    }

    addTask(newtask: newTask, userId: string) {
        this.tasks.unshift({
            id: new Date().getTime().toString(),
            userId: userId,
            title: newtask.title,
            summary: newtask.summary,
            dueDate: newtask.date
        })
        this.saveTasks();
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id)
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}