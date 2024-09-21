import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSubjectService {
  public isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor() { }
}
