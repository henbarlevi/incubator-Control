import { Inject, Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions, ResponseContentType  } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { CompleterData, CompleterItem } from "ng2-completer";

@Injectable()
export class CustomData extends Subject<CompleterItem[]> implements CompleterData {
    //http://stackoverflow.com/questions/40172248/angular-2-ng2-completer-avoid-http-dependency-injection-in-service-from-compo
    constructor(private http: Http) {
        super();
    }
    public search(searchTerm: string): void {
        //setting domain as a queryString parameter:
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', searchTerm);
        this.http.get('http://localhost:3000/admin/project/auto-complete',{ search: params })
            .map((res: Response) => {
                let data = res.json();
                console.log(data);
                this.next(data);
            })
            .subscribe();
    }

    public cancel() {
    }
}