// import {Injectable} from '@angular/core';
// import {of} from 'rxjs';
// import {catchError} from 'rxjs/operators';
// import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
// import {DecisionService} from '../../domain/services/decision.service';
//
// @Injectable()
// export class DecisionResolve implements Resolve<any> {
//     constructor(private decisionService: DecisionService) {}
//     resolve(route: ActivatedRouteSnapshot) {
//         const caseId = route.paramMap.get('case_id');
//         const pageId = 'create';
//         const jurId = 'fr';
//         return this.decisionService.fetch(jurId, caseId, pageId).pipe(catchError(error => {
//                 console.log(error);
//                 return of(null);
//             }));
//     }
// }
