import { authService } from './service';

export const authQueries = {
  signUp: {
    mutationFn: authService.signUp,
  },
  signIn: {
    mutationFn: authService.signIn,
  },
  signOut: {
    mutationFn: authService.signOut,
  },
  withdraw: {
    mutationFn: authService.withdraw,
  },
  socialSignIn: {
    mutationFn: authService.socialSignIn,
  },
};
