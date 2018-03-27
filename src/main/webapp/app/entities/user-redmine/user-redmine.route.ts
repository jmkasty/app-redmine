import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRedmineComponent } from './user-redmine.component';
import { UserRedmineDetailComponent } from './user-redmine-detail.component';
import { UserRedminePopupComponent } from './user-redmine-dialog.component';
import { UserRedmineDeletePopupComponent } from './user-redmine-delete-dialog.component';

export const userRedmineRoute: Routes = [
    {
        path: 'user-redmine',
        component: UserRedmineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.userRedmine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-redmine/:id',
        component: UserRedmineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.userRedmine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userRedminePopupRoute: Routes = [
    {
        path: 'user-redmine-new',
        component: UserRedminePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.userRedmine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-redmine/:id/edit',
        component: UserRedminePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.userRedmine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-redmine/:id/delete',
        component: UserRedmineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.userRedmine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
