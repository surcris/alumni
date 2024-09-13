import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiveCodeService {

  private readonly URI: string = `${environment.baseURL}:3000/user`

  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) { }

    /**
   * Get a boolean that show if an email is valid or not 
   * @returns Observable<Boolean>
   */
    public generateCode(): Observable<number>{
      return this._httpClient.get<number>(
        this.URI + '/code',
        
      )
    }
}
