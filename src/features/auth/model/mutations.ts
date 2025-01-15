import { signUp } from '../api';

export const authMutations = {
  signUp: {
    mutationFn: signUp,
  },
};
