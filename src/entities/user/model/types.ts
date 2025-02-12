import { LOGIN_STATUS } from './constants';

export type LoginStatus = keyof typeof LOGIN_STATUS;

export interface UserProfile {
  name: string;
  description: string;
  image: string | File;
}
