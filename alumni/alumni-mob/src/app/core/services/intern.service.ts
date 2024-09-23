import { Injectable } from '@angular/core';
import { InternType } from '../types/intern/inter-type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { InternDTO } from '../internDto/internDto';
import { InternTransformer } from '../transformers/intern.transformer';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { InternTransfo } from '../transformers/intern-transfo';
import { SkillsType } from '../types/skills/skillType';


@Injectable({
  providedIn: 'root'
})
export class InternService {
  private _interns: Array<InternType> = []
  private readonly URI: string = `${environment.baseURL}:3000/intern`
  private _intern: InternType | null = null

  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) {}

  public companyFilter(company: string): Array<InternType> {
    throw new Error('Not implemented yet')
  }

  /**
   * 
   * @returns Observable<InternType[]>
   */
  public findAll(): Observable<Array<InternDTO>> {
    return this._httpClient.get<Array<any>>(this.URI,{
      headers:{
        authorization: 'Bearer '+this._storage.retrieve('auth').accessToken,
        authorizationRefresh: 'Bearer '+this._storage.retrieve('auth').refreshToken,
      }
    }
    ).pipe(
      map((interns: Array<any>) => {
        return interns.map((intern: any) => {
          return InternTransformer.transform(intern)
        })
      }))
  }

  public findByIdByEmail(email: string): Observable<InternDTO> {
    return this._httpClient.get<InternDTO>(`${this.URI}/findOneByEmail/${email}`)
    .pipe(
      map((intern:any) => {
        // this._intern = intern
        return InternTransformer.transform(intern)
      })
    )
  }
  public findOne(id: string): Observable<InternType> {
    return this._httpClient.get<InternType>(`${this.URI}/findOne/${id}`);
  }

  set intern(intern: any) {
    this._intern = intern
  }

  get intern(): any| null {
    return this._intern
  }



  getProfileData(): Observable<InternDTO> {
    return this._httpClient.get<InternDTO>(`${this.URI}/profile`).pipe(
      map((intern:any) => {
        // this._intern = intern
        return InternTransformer.transform(intern)
      })
    );
  }
  updateProfileData(intern: InternDTO): Observable<boolean> {
    return this._httpClient.patch<boolean>(`${this.URI}`, intern);
}
  updateSkill(skill: SkillsType): Observable<any> {
  return this._httpClient.patch<any>(`${this.URI}`, skill); 
}
}
