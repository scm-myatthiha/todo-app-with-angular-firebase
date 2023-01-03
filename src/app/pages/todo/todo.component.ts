import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable, BehaviorSubject } from 'rxjs';

import { Task, TaskDialogResult } from 'src/app/constants/interfaces';
import { TaskDialogComponent } from 'src/app/components/task-dialog/task-dialog.component';
import { TodoService } from 'src/app/services/todo.service';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: Observable<Task[]>;
  inProgress: Observable<Task[]>;
  done: Observable<Task[]>;
  isAdd: boolean = false;

  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    private todoSvc: TodoService
  ) {
    this.todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
    this.inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
    this.done = getObservable(this.store.collection('done')) as Observable<Task[]>;
  }

  ngOnInit(): void {
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      result.delete ? this.store.collection(list).doc(task.id).delete() : this.store.collection(list).doc(task.id).update(task);
    });
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    if ((event.previousContainer === event.container) || (!event.previousContainer.data || !event.container.data)) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void {
    this.todoSvc.isAddTask$.next(true);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      this.todoSvc.isAddTask$.next(false);
      if (!result) {
        return;
      }
      this.store.collection('todo').add(result.task);
    });
  }
}
