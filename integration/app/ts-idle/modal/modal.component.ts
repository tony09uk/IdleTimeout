import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

    @Input() id: string;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    private _closed$: Subject<boolean> = new Subject<boolean>();
    private element: any;

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        this.toggleVisibility();

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: any) => { // todo: add strong typing to this
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        // this.element.style.display = 'block';
        // this.element.style.visibility = 'visible';
        // document.body.classList.add('jw-modal-open');
        this.toggleVisibility();
    }

    // close modal
    close(): void {
        // this.element.style.display = 'none';
        // document.body.classList.remove('jw-modal-open');

        this.toggleVisibility();
        this._closed$.next(true);
    }

    afterClosed(): Observable<boolean> {
      return this._closed$;
    }

    private toggleVisibility(): void {
      if (this.element.style.visibility === 'hidden') {
        this.element.style.visibility = 'visible';
        this.element.style.opacity = 1;
      } else {
        this.element.style.visibility = 'hidden';
        this.element.style.opacity = 0;
      }

    }

}
