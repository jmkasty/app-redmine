import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UserRedmine } from './user-redmine.model';
import { UserRedmineService } from './user-redmine.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-redmine',
    templateUrl: './user-redmine.component.html'
})
export class UserRedmineComponent implements OnInit, OnDestroy {
userRedmines: UserRedmine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userRedmineService: UserRedmineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userRedmineService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userRedmines = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserRedmines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserRedmine) {
        return item.id;
    }
    registerChangeInUserRedmines() {
        this.eventSubscriber = this.eventManager.subscribe('userRedmineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
