import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType  } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { CompleterData, CompleterItem } from "ng2-completer";

@Injectable()
export class CustomData extends Subject<CompleterItem[]> implements CompleterData {

    constructor(private http: Http) {
        super();
    }
    public search(searchTerm: string): void {
        //setting domain as a queryString parameter:
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', searchTerm);
        this.http.get('http://localhost:3000/admin/project/auto-complete',{ search: params })
            .map((res: Response) => {
                console.log(res);
                let data = res.json();
                this.next(data);
            })
            .subscribe();
    }

    public cancel() {
    }
}