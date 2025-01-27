import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, '이메일은 필수입니다').email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호는 필수입니다')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^[A-Za-z0-9]+$/, '비밀번호는 영문자와 숫자만 사용할 수 있습니다'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().min(1, '이메일은 필수입니다').email('올바른 이메일 형식이 아닙니다'),
    name: z
      .string()
      .min(1, '사용자명은 필수입니다')
      .min(2, '사용자명은 최소 2자 이상이어야 합니다')
      .max(12, '사용자명은 최대 12자까지 가능합니다')
      .regex(/^[A-Za-z가-힣0-9]+$/, '사용자명은 영문, 한글, 숫자만 사용할 수 있습니다'),
    password: z
      .string()
      .min(1, '비밀번호는 필수입니다')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^[A-Za-z0-9]+$/, '비밀번호는 영문자와 숫자만 사용할 수 있습니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인은 필수입니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signOffSchema = z.object({
  confirmText: z.literal('회원탈퇴', {
    errorMap: () => ({ message: '회원탈퇴를 정확히 입력해주세요' }),
  }),
});

export type SignOffFormData = z.infer<typeof signOffSchema>;
