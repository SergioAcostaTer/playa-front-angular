import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router"; // Correct Router import
import { AuthStateService } from "../services/auth-state.service";
import { map } from "rxjs/operators"; // Use rxjs/operators for map

export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState.pipe(
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

  return authState.authState.pipe(
    map(state => {
      if (state) { // Changed logic: redirect if authenticated
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};