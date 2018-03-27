import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Track } from './track.model';
import { TrackService } from './track.service';

@Injectable()
export class TrackPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private trackService: TrackService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.trackService.find(id).subscribe((track) => {
                    if (track.date) {
                        track.date = {
                            year: track.date.getFullYear(),
                            month: track.date.getMonth() + 1,
                            day: track.date.getDate()
                        };
                    }
                    track.time = this.datePipe
                        .transform(track.time, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.trackModalRef(component, track);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.trackModalRef(component, new Track());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    trackModalRef(component: Component, track: Track): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.track = track;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
