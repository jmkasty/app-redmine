import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserRedmine } from './user-redmine.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserRedmineService {

    private resourceUrl = SERVER_API_URL + 'api/user-redmines';

    constructor(private http: Http) { }

    create(userRedmine: UserRedmine): Observable<UserRedmine> {
        const copy = this.convert(userRedmine);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userRedmine: UserRedmine): Observable<UserRedmine> {
        const copy = this.convert(userRedmine);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserRedmine> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    trackToday(login: any): Observable<UserRedmine> {
        return this.http.get('api/user-redmines/getTimesToday/' + login).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to UserRedmine.
     */
    private convertItemFromServer(json: any): UserRedmine {
        const entity: UserRedmine = Object.assign(new UserRedmine(), json);
        return entity;
    }

    /**
     * Convert a UserRedmine to a JSON which can be sent to the server.
     */
    private convert(userRedmine: UserRedmine): UserRedmine {
        const copy: UserRedmine = Object.assign({}, userRedmine);
        return copy;
    }
}
