import { userService } from './service';

export const userQueries = {
  putUserProfile: {
    mutationFn: userService.putUserProfile,
  },
};
