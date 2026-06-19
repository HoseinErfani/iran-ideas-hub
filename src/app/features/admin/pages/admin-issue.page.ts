import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreemapComponent } from '../../../shared/components/treemap.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb.component';
import { IdeaBoardComponent } from '../../user/pages/idea-board.component';
import { IssueService } from '../../../shared/services/issue.service';

@Component({
  selector: 'app-admin-issue-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, TreemapComponent, IdeaBoardComponent],
  providers: [IssueService],
  template: `
    <div class="w-full" dir="rtl">
      <app-breadcrumb
        class="mb-4 block"
        [items]="issueService.breadcrumbData()"
        (onItemClick)="issueService.handleBreadcrumbNav($event)"
      ></app-breadcrumb>

      <app-treemap
        *ngIf="issueService.currentLevel() < 3"
        class="max-h-[calc(100vh-200px)] overflow-auto pl-4 -ml-4"
        [items]="issueService.mappedTreemapData()"
        (onNodeClick)="issueService.handleNodeSelect($event)"
      ></app-treemap>

      <app-idea-board
        *ngIf="issueService.currentLevel() === 3"
        styleClass="max-h-[calc(100vh-200px)] overflow-auto pl-4 -ml-4"
        [readonly]="true"
        [issueId]="issueService.selectedSecondLevel()?.id || ''"
      ></app-idea-board>
    </div>
  `,
})
export class AdminIssuePageComponent {
  protected readonly issueService = inject(IssueService);
}
