import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty('이메일은 필수입니다')
    .email({ message: '올바른 이메일 형식이 아닙니다' }),
  password: z
    .string()
    .nonempty('비밀번호는 필수입니다')
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
