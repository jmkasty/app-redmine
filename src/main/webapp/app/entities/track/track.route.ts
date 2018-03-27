import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackPopupComponent } from './track-dialog.component';
import { TrackDeletePopupComponent } from './track-delete-dialog.component';

export const trackRoute: Routes = [
    {
        path: 'track',
        component: TrackComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.track.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'track/:id',
        component: TrackDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.track.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trackPopupRoute: Routes = [
    {
        path: 'track-new',
        component: TrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.track.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track/:id/edit',
        component: TrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.track.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'track/:id/delete',
        component: TrackDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.track.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
