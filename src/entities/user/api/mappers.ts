import type { GetUserResponseDTO } from './dto';
import type { User } from '@/shared/model/types/auth';

export const mapUserResponseDTOToUser = (dto: GetUserResponseDTO): User => ({
  // 변환할게 있나 없나
  id: dto.id,
  name: dto.name,
  email: dto.email,
  loginStatus: dto.loginStatus,
  profileImageURL: dto.profileImageURL,
  description: dto.description,
});
