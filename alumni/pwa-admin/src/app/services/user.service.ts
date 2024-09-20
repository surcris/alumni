import { Injectable } from "@angular/core";
import { Users } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = `${environment.apiBaseUrl}/user`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>(`${this.endpoint}`)
  }

  demosObservable(): void {
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    let total = 0;
    const observer = {
      next: (x: number) => { total += x; console.log('Donnée reçue', x)},
      error: (e: any) => { },
      complete: () => { console.log('Le total est ', total)},
    }

    // le susbcribe attends un objet observer
    observable.subscribe(observer);

    // ou une fonction comme le next
    observable.subscribe((data) => {
    });

    // demonstration des pipes (operations sur les observables)
    observable.pipe(
      map((x: number) => { return x * 10; })
    )

  }

}
