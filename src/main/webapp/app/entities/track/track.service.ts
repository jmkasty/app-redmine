import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Track } from './track.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TrackService {

    private resourceUrl = SERVER_API_URL + 'api/tracks';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(track: Track): Observable<Track> {
        const copy = this.convert(track);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(track: Track): Observable<Track> {
        const copy = this.convert(track);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Track> {
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
     * Convert a returned JSON object to Track.
     */
    private convertItemFromServer(json: any): Track {
        const entity: Track = Object.assign(new Track(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        entity.time = this.dateUtils
            .convertDateTimeFromServer(json.time);
        return entity;
    }

    /**
     * Convert a Track to a JSON which can be sent to the server.
     */
    private convert(track: Track): Track {
        const copy: Track = Object.assign({}, track);
        copy.date = this.dateUtils
            .convertLocalDateToServer(track.date);

        copy.time = this.dateUtils.toDate(track.time);
        return copy;
    }
}
