import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.status === 0) {
        // Network error or server unreachable
        errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
      } else if (error.status === 401) {
        errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      } else if (error.status === 403) {
        errorMessage = 'Accès refusé.';
      } else if (error.status === 404) {
        errorMessage = 'Ressource introuvable.';
      } else if (error.status >= 500) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      }

      return throwError(() => new Error(errorMessage));
    }),
  );
};
