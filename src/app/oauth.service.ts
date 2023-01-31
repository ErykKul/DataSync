// Author: Eryk Kulikowski @ KU Leuven (2023). Apache 2.0 License

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from './models/oauth';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  token_url = 'api/common/oauthtoken';

  constructor(
    private http: HttpClient
  ) { }

  getToken(pluginId: string, code: string): Observable<TokenResponse> {
    let req = {
      pluginId: pluginId,
      code: code,
    }
    return this.http.post<TokenResponse>(this.token_url, req);
  }
}
