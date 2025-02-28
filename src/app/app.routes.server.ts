import { RenderMode, ServerRoute } from '@angular/ssr';
import { beachesList, beachesRoutes } from './constants/beachesList';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
