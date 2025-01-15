import { signIn, signUp } from '../api';

export const authMutations = {
  signUp: {
    mutationFn: signUp,
  },
  signIn: {
    mutationFn: signIn,
  },
};
