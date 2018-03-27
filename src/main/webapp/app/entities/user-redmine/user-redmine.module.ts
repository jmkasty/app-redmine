import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import { JhipsterAdminModule } from '../../admin/admin.module';
import {
    UserRedmineService,
    UserRedminePopupService,
    UserRedmineComponent,
    UserRedmineDetailComponent,
    UserRedmineDialogComponent,
    UserRedminePopupComponent,
    UserRedmineDeletePopupComponent,
    UserRedmineDeleteDialogComponent,
    userRedmineRoute,
    userRedminePopupRoute,
} from './';

const ENTITY_STATES = [
    ...userRedmineRoute,
    ...userRedminePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        JhipsterAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserRedmineComponent,
        UserRedmineDetailComponent,
        UserRedmineDialogComponent,
        UserRedmineDeleteDialogComponent,
        UserRedminePopupComponent,
        UserRedmineDeletePopupComponent,
    ],
    entryComponents: [
        UserRedmineComponent,
        UserRedmineDialogComponent,
        UserRedminePopupComponent,
        UserRedmineDeleteDialogComponent,
        UserRedmineDeletePopupComponent,
    ],
    providers: [
        UserRedmineService,
        UserRedminePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterUserRedmineModule {}
