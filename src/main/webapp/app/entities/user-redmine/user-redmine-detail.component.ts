import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserRedmine } from './user-redmine.model';
import { UserRedmineService } from './user-redmine.service';

@Component({
    selector: 'jhi-user-redmine-detail',
    templateUrl: './user-redmine-detail.component.html'
})
export class UserRedmineDetailComponent implements OnInit, OnDestroy {

    userRedmine: UserRedmine;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userRedmineService: UserRedmineService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserRedmines();
    }

    load(id) {
        this.userRedmineService.find(id).subscribe((userRedmine) => {
            this.userRedmine = userRedmine;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserRedmines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userRedmineListModification',
            (response) => this.load(this.userRedmine.id)
        );
    }
}
