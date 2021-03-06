import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.service';

@Component({
    selector: 'app-check-list-for-hearing',
    templateUrl: './check-hearing.component.html',
    styleUrls: ['./check-hearing.component.scss']
})
export class CheckHearingComponent implements OnInit {
    form: FormGroup;
    case: any;

    relistReasonText: string;

    error: boolean;

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };


    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private hearingService: HearingService,
                private redirectionService: RedirectionService,
                private cdRef: ChangeDetectorRef) {}

    createForm() {
        this.form = this.fb.group({});
    }

    ngOnInit() {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));
        this.hearingService.currentMessage.subscribe(message => this.relistReasonText = message);
        this.case = this.route.parent.snapshot.data['caseData'];

        this.createForm();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    submitCallback(values) {
        if (this.form.valid) {
            this.hearingService.listForHearing(this.case.id, this.relistReasonText)
                .subscribe(() => {
                        this.redirectionService.redirect(`/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/viewcase/${this.case.id}/hearing/confirm`);
                    }, error => {
                        this.error = true;
                        console.error('Something went wrong', error);
                    }
                );
        }
    }

}
