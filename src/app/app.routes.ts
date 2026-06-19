import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/public/pages/auth.page').then((m) => m.AuthPageComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/components/admin-shell.component').then((m) => m.AdminShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/pages/admin-dashboard.page').then(
            (m) => m.AdminDashboardPageComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/pages/admin-users.page').then((m) => m.AdminUsersPageComponent),
      },
      {
        path: 'issues',
        loadComponent: () =>
          import('./features/admin/pages/admin-issue.page').then(
            (m) => m.AdminIssuePageComponent,
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/admin/pages/admin-reports.page').then(
            (m) => m.AdminReportsPageComponent,
          ),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./features/admin/pages/admin-news.page').then((m) => m.AdminNewsPageComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./features/admin/pages/admin-gallery.page').then(
            (m) => m.AdminGalleryPageComponent,
          ),
      },
      {
        path: 'pages',
        loadComponent: () =>
          import('./features/admin/pages/admin-pages.page').then((m) => m.AdminPagesPageComponent),
      },
      {
        path: 'communication',
        loadComponent: () =>
          import('./features/admin/pages/admin-communication.page').then(
            (m) => m.AdminCommunicationPageComponent,
          ),
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./shared/components/user-shell.component').then((m) => m.UserShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user/pages/user-dashboard.page').then(
            (m) => m.UserDashboardPageComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/user/pages/user-profile.page').then((m) => m.UserProfilePageComponent),
      },
      {
        path: 'inbox',
        loadComponent: () =>
          import('./features/user/pages/user-inbox.page').then((m) => m.UserInboxPageComponent),
      },
      {
        path: 'issues',
        loadComponent: () =>
          import('./features/user/pages/user-issues.page').then(
            (m) => m.UserIssuesPageComponent,
          ),
      },
      {
        path: 'review',
        loadComponent: () =>
          import('./features/user/pages/user-review.page').then((m) => m.UserReviewPageComponent),
      },
      {
        path: 'friends',
        loadComponent: () =>
          import('./features/user/pages/user-friends.page').then((m) => m.UserFriendsPageComponent),
      },
      {
        path: 'security',
        loadComponent: () =>
          import('./features/user/pages/user-security.page').then(
            (m) => m.UserSecurityPageComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'auth' },
];
