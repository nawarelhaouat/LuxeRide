import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🛂 Interceptor appelé →', req.url);

  const token = localStorage.getItem('authToken');
  console.log('🔑 Token =', token);

  if (token && !req.url.includes('/login')) {
    console.log('✅ Token ajouté');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log('❌ Token NON ajouté');
  }

  return next(req);
};
