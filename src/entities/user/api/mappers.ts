import type { User } from '../model/types';
import type { GetUserResponseDTO } from './dto';

export const mapUserResponseDTOToUser = (dto: GetUserResponseDTO): User => ({
  // 변환할게 있나 없나
  id: dto.id,
  name: dto.name,
  email: dto.email,
  loginStatus: dto.loginStatus,
  profileImageURL: dto.profileImageURL,
  description: dto.description,
});
