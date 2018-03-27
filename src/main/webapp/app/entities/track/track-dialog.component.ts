import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Track } from './track.model';
import { TrackPopupService } from './track-popup.service';
import { TrackService } from './track.service';
import { UserRedmine, UserRedmineService } from '../user-redmine';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-track-dialog',
    templateUrl: './track-dialog.component.html'
})
export class TrackDialogComponent implements OnInit {

    track: Track;
    isSaving: boolean;

    userredmines: UserRedmine[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trackService: TrackService,
        private userRedmineService: UserRedmineService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userRedmineService.query()
            .subscribe((res: ResponseWrapper) => { this.userredmines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.track.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trackService.update(this.track));
        } else {
            this.subscribeToSaveResponse(
                this.trackService.create(this.track));
        }
    }

    private subscribeToSaveResponse(result: Observable<Track>) {
        result.subscribe((res: Track) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Track) {
        this.eventManager.broadcast({ name: 'trackListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserRedmineById(index: number, item: UserRedmine) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-track-popup',
    template: ''
})
export class TrackPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackPopupService: TrackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trackPopupService
                    .open(TrackDialogComponent as Component, params['id']);
            } else {
                this.trackPopupService
                    .open(TrackDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
