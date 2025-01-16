// import { FormProvider, UseFormReturn, useFormContext } from 'react-hook-form';
// import { ReactNode } from 'react';

// interface FormType {
//   name: string;
// }

// const FormInput = ({ name }: { name: keyof FormType }) => {
//   const { register } = useFormContext<FormType>();
//   return <input {...register(name)} />;
// };

// const FormContainer = ({ method, children }: { method: UseFormReturn; children: ReactNode }) => {
//   return (
//     <FormProvider {...method}>
//       <form>{children}</form>
//     </FormProvider>
//   );
// };

// export const ModalForm = Object.assign(FormContainer, {
//   Input: FormInput,
// });
