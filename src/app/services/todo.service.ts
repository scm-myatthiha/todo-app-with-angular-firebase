import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  isAddTask$ = new BehaviorSubject<boolean | null>(null);
  constructor() { }
}
