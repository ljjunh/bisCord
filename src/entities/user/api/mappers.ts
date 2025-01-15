import type { User } from '../model/types';
import type { UserResponseDTO } from './dto';

export const mapUserResponseDTOToUser = (dto: UserResponseDTO): User => ({
  // 변환할게 있나 없나
  id: dto.id,
  name: dto.name,
  profileImageURL: dto.profileImageURL,
  description: dto.description,
});
