import { Injectable } from '@angular/core';
import { CompareResult } from './models/compare-result';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  github_compare_url = 'api/github/compare';

  constructor(private http: HttpClient, private credentialsService: CredentialsService) { }

  getData(): Observable<CompareResult> {
    let credentials = this.credentialsService.credentials;
    var req;
    var url = '';
    switch (credentials.repo_type) {
      case "github":
        req = {
          ghToken: credentials.repo_token,
          ghUser: credentials.repo_owner,
          repo: credentials.repo_name,
          hash: credentials.repo_branch,
          persistentId: credentials.dataset_id,
          dataverseKey: credentials.dataverse_token,
        };
        url = this.github_compare_url;
        break;

      default:
        break;
    }

    return this.http.post<CompareResult>(url, req).pipe(
      map((res: CompareResult) => {
        res.data = res.data?.sort((o1, o2) => (o1.id === undefined ? "" : o1.id) < (o2.id === undefined ? "" : o2.id) ? -1 : 1);
        return res;
      }));
  }

}
