import { ImageDTO } from './type';
import { apiClient } from '@/shared/api/apiClient';

export const imageService = {
  postImage: async ({ imageData }: { imageData: string | null }): Promise<ImageDTO> => {
    const response = await apiClient.post<ImageDTO>({
      url: '/image',
      data: imageData,
    });
    console.log(response.data);
    return response.data;
  },
};
