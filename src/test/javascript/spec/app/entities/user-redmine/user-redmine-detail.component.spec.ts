/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserRedmineDetailComponent } from '../../../../../../main/webapp/app/entities/user-redmine/user-redmine-detail.component';
import { UserRedmineService } from '../../../../../../main/webapp/app/entities/user-redmine/user-redmine.service';
import { UserRedmine } from '../../../../../../main/webapp/app/entities/user-redmine/user-redmine.model';

describe('Component Tests', () => {

    describe('UserRedmine Management Detail Component', () => {
        let comp: UserRedmineDetailComponent;
        let fixture: ComponentFixture<UserRedmineDetailComponent>;
        let service: UserRedmineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [UserRedmineDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserRedmineService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserRedmineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserRedmineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserRedmineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserRedmine(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userRedmine).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
