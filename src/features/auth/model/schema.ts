import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .nonempty('이메일은 필수입니다')
    .email({ message: '올바른 이메일 형식이 아닙니다' }),
  password: z
    .string()
    .nonempty('비밀번호는 필수입니다')
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: '비밀번호는 영문자와 숫자만 사용할 수 있습니다',
    }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .nonempty('이메일은 필수입니다')
      .email({ message: '올바른 이메일 형식이 아닙니다' }),
    username: z
      .string()
      .nonempty('사용자명은 필수입니다')
      .min(2, { message: '사용자명은 최소 2자 이상이어야 합니다' })
      .max(12, { message: '사용자명은 최대 12자까지 가능합니다' })
      .regex(/^[A-Za-z0-9]+$/, {
        message: '사용자명은 영문자와 숫자만 사용할 수 있습니다',
      }),
    password: z
      .string()
      .nonempty('비밀번호는 필수입니다')
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' })
      .regex(/^[A-Za-z0-9]+$/, {
        message: '비밀번호는 영문자와 숫자만 사용할 수 있습니다',
      }),
    confirmPassword: z.string().nonempty('비밀번호 확인은 필수입니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;
