import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserRedmine } from './user-redmine.model';
import { UserRedminePopupService } from './user-redmine-popup.service';
import { UserRedmineService } from './user-redmine.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-redmine-dialog',
    templateUrl: './user-redmine-dialog.component.html'
})
export class UserRedmineDialogComponent implements OnInit {

    userRedmine: UserRedmine;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userRedmineService: UserRedmineService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userRedmine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userRedmineService.update(this.userRedmine));
        } else {
            this.subscribeToSaveResponse(
                this.userRedmineService.create(this.userRedmine));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserRedmine>) {
        result.subscribe((res: UserRedmine) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserRedmine) {
        this.eventManager.broadcast({ name: 'userRedmineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-redmine-popup',
    template: ''
})
export class UserRedminePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRedminePopupService: UserRedminePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userRedminePopupService
                    .open(UserRedmineDialogComponent as Component, params['id']);
            } else {
                this.userRedminePopupService
                    .open(UserRedmineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
