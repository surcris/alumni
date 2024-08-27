import { Injectable } from '@angular/core';
import { InternType } from '../types/intern/inter-type'; 
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { InternDTO } from '../internDto/internDto'; 
import { InternTransformer } from '../transformers/intern.transformer';


@Injectable({
  providedIn: 'root'
})
export class InternService {
  private _interns: Array<InternType> = []
  private readonly URI: string = 'http://localhost:3000/intern'

  constructor(
    private _httpClient: HttpClient
  ) {}

  public companyFilter(company: string): Array<InternType> {
    throw new Error('Not implemented yet')
  }
  
  /**
   * 
   * @returns Observable<InternType[]>
   */
  public findAll(): Observable<Array<InternDTO>> {
    return this._httpClient.get<Array<any>>(this.URI).pipe(
      map((interns: Array<any>) => {
        return interns.map((intern: any) => {
        return InternTransformer.transform(intern)})
}))}

}
