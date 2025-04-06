import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomePageComponent)
    },
    {
        path: 'favourites',
        loadComponent: () => import('./favourites/favourite.component').then(m => m.FavouritePageComponent),
    },
    {
        path: 'beach/:slug',
        loadComponent: () => import('./beachDetail/beach-detail.component').then(m => m.BeachDetailPageComponent),
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfilePageComponent),
    },
    {
        path: 'ranking',
        loadComponent: () => import('./ranking/ranking.component').then(m => m.RankingPageComponent),
    },
    {
        path: 'view-profile/:username',
        loadComponent: () => import('./view-profile/view-profile.component').then(m => m.ViewProfileComponent),
    },
    {
        path: 'search',
        loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
    }
] as Routes;