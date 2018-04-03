import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { UserRedmineService } from '../entities/user-redmine/user-redmine.service';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    usuarioRedmine: any = {};

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private userRedmineService: UserRedmineService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            this.getUserData();
            /*this.usuarioRedmine.puntos = {'task':'1234','time':'2'};*/
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    getUserData() {
        this.usuarioRedmine.token = '123456789: ' + this.account.login;
        this.userRedmineService.trackToday(this.account.login).subscribe((puntos: any) => {        	
            let obj = [];
            if(true){
	           for (let prop in puntos) {
	              obj.push(puntos[prop]);        	    
	           }
	        }
        	this.usuarioRedmine.puntos = obj;
        	console.log("Puntos: "+JSON.stringify(obj));
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
