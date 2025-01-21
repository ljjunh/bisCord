import { FormType } from '../useModalForm';
import { FormProvider, UseFormReturn, useFormContext } from 'react-hook-form';
import { BaseSyntheticEvent, ReactNode, useState } from 'react';

// Form input 컴포넌트
const FormInput = ({ name, label }: { name: keyof FormType; label: string }) => {
  const { register } = useFormContext<FormType>();
  const [inputText, setInputText] = useState<string>('');

  return (
    <div className="flex h-full w-full flex-grow flex-col items-start gap-2 px-4">
      <label className="text-xs font-semibold text-light-gray">{label}</label>
      <input
        value={inputText}
        placeholder="이름을 생성해 주세요"
        {...register(name, {
          onChange: (e) => setInputText(e.target.value),
        })}
        className="w-full rounded-md bg-black p-2 text-lg text-white outline-none"
      />
    </div>
  );
};

export const FormContainer = ({
  methods,
  children,
  onSubmit,
}: {
  methods: UseFormReturn<FormType>;
  children: ReactNode;
  onSubmit?: (e?: BaseSyntheticEvent) => Promise<void>;
}) => {
  return (
    <FormProvider {...methods}>
      <form
        className="flex w-full flex-grow flex-col"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </FormProvider>
  );
};

// 여기서 하위 elements추가
export const ModalForm = Object.assign(FormContainer, {
  Input: FormInput,
});
