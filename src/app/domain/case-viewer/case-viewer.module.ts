import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import {SharedModule} from '../../shared/shared.module';
import { DocumentPanelComponent } from './components/document-panel/document-panel.component';
import { SummaryPanelComponent } from './components/summary-panel/summary-panel.component';
import { PartiesPanelComponent } from './components/parties-panel/parties-panel.component';
import { CaseNavComponent } from './components/case-nav/case-nav.component';
import { TimelinePanelComponent } from './components/timeline-panel/timeline-panel.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CaseDetailsBarComponent } from './components/case-details-bar/case-details-bar.component';
import {DocumentViewerModule} from '../../shared/components/document-viewer/document-viewer.module';
import {RouterModule} from '@angular/router';
import { CaseViewerContainerComponent } from './components/case-viewer-container/case-viewer-container.component';
import { CaseDecisionContainerComponent } from './components/case-decision-container/case-decision-container.component';
import { TimelineSectionComponent } from './components/timeline-section/timeline-section.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule,
        RouterModule
    ],
    exports: [
        CaseViewerComponent,
        DocumentPanelComponent,
        CaseDetailsBarComponent,
        CaseViewerContainerComponent,
        CaseDecisionContainerComponent
    ],
    declarations: [
        CaseViewerComponent,
        DocumentPanelComponent,
        SummaryPanelComponent,
        PartiesPanelComponent,
        TimelinePanelComponent,
        CaseNavComponent,
        CaseDetailsBarComponent,
        CaseViewerContainerComponent,
        CaseDecisionContainerComponent,
        TimelineSectionComponent,
        TimelineComponent,
        CaseNavComponent,
        CaseDetailsBarComponent,
        TimelineSectionComponent
    ]
})
export class CaseViewerModule {
}
