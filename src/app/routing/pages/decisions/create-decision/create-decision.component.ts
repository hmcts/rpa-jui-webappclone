import {Component, OnInit, Inject, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../../domain/services/decision.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-decision-make',
    templateUrl: './create-decision.component.html',
    styleUrls: ['./create-decision.component.scss']
})
export class CreateDecisionComponent implements OnInit {
    form: FormGroup;
    case: any;
    decision: any;
    options = [];

    decisionAward: string = '';
    decisionState: string = '';
    decisionText: string = '';

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    error = {
        server: false,
        decision: false,
        notes: false
    };

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private decisionService: DecisionService,
        private cdRef : ChangeDetectorRef
    ) { }

    createForm() {
        this.form = this.fb.group({
            decision: [this.decisionAward, Validators.required],
            notes: [this.decisionText, Validators.required],
        });
    }

    ngOnInit() {
        this.eventEmitter.subscribe(this.submitCallback.bind(this));

        this.case = this.route.parent.snapshot.data['caseData'];
        this.decision = this.route.parent.snapshot.data['decision'];
        this.options = this.case.decision.options;

        console.log(this.decision);

        if(this.decision){
            this.decisionAward = this.decision.decision_award;
            this.decisionState = this.decision.decision_state.state_name;
            this.decisionText = this.decision.decision_text;
        }
        this.createForm();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    submitCallback(values) {

        console.log('woop!!!!', values);
        console.log('is it valid? - ', this.form.valid);
        if (this.form.valid) {
            if(this.decision) {
                this.decisionService.updateDecisionDraft(this.case.id, values.decision, values.notes)
                    .subscribe(
                        () => this.router.navigate(['../check'], {relativeTo: this.route}),
                        error => this.error.server = true
                    );
            }
            else {
                this.decisionService.submitDecisionDraft(this.case.id, values.decision, values.notes)
                    .subscribe(
                        () => this.router.navigate(['../check'], {relativeTo: this.route}),
                        error => this.error.server = true
                    );
            }


        }
        else {
            this.error.decision = !this.form.controls.decision.valid;
            this.error.notes = !this.form.controls.notes.valid;
        }
    }
}