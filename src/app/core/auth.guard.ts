import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../services/auth-state.service";
import { map, take, catchError } from "rxjs/operators";

export const privateGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
        map(state => {
        if (!state) {
            router.navigate(['/auth/login']);
            return false;
        }
        return true;
        })
    );
};

export const publicGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
        map(state => {
        if (state) { 
            router.navigate(['/']);
            return false;
        }
        return true;
        })
    );
};
