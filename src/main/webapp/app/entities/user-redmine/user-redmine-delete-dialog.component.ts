import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserRedmine } from './user-redmine.model';
import { UserRedminePopupService } from './user-redmine-popup.service';
import { UserRedmineService } from './user-redmine.service';

@Component({
    selector: 'jhi-user-redmine-delete-dialog',
    templateUrl: './user-redmine-delete-dialog.component.html'
})
export class UserRedmineDeleteDialogComponent {

    userRedmine: UserRedmine;

    constructor(
        private userRedmineService: UserRedmineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userRedmineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userRedmineListModification',
                content: 'Deleted an userRedmine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-redmine-delete-popup',
    template: ''
})
export class UserRedmineDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userRedminePopupService: UserRedminePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userRedminePopupService
                .open(UserRedmineDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
