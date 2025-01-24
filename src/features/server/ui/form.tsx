import { FormProvider, UseFormReturn, useFormContext } from 'react-hook-form';
import { BaseSyntheticEvent, ReactNode } from 'react';
import ChannelUnlockedIcon from '@/shared/icons/ChannelUnlockedIcon';
import VoiceIcon from '@/shared/icons/VoiceIcon';
import { FormType } from '../useModalForm';

// Form input 컴포넌트
const FormInput = ({ name, label }: { name: keyof FormType; label: string }) => {
  const { register } = useFormContext<FormType>();

  return (
    <div className="mb-2 flex h-full w-full flex-grow flex-col items-start gap-2 px-4">
      <label className="text-xs font-semibold text-light-gray">{label}</label>
      <input
        placeholder="이름을 생성해 주세요"
        {...register(name)}
        className="text-md w-full rounded-md bg-black p-2 text-white outline-none"
      />
    </div>
  );
};

/**  */
const FormRadio = ({
  name,
  options,
}: {
  name: keyof FormType;
  options: { label: string; value: 'TEXT' | 'VOICE' }[];
}) => {
  const { register, watch } = useFormContext<FormType>();
  const selectedValue = watch(name); // 현재 선택된 radio 버튼의 값

  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-start text-xs font-semibold text-light-gray">채널 타입</p>
      <div className="flex w-full flex-col items-start gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value; // 선택 여부 확인

          return (
            <div
              className={`w-full cursor-pointer overflow-hidden rounded-md hover:bg-light-gray ${isSelected ? 'bg-light-gray bg-opacity-70' : 'bg-gray hover:bg-opacity-50'} `}
            >
              <label
                key={option.value}
                className="flex w-full items-center gap-2 bg-dark-gray bg-opacity-50 px-4 py-4"
              >
                {option.label === '텍스트' ? (
                  <ChannelUnlockedIcon size={20} />
                ) : (
                  <VoiceIcon size={20} />
                )}
                <span className="text-md flex-grow text-start text-white">{option.label}</span>
                <input
                  type="radio"
                  value={option.value}
                  {...register(name)}
                  className="h-5 w-5 accent-white outline-none"
                />
              </label>
            </div>
          );
        })}
      </div>
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
        className="flex w-full flex-grow flex-col gap-2"
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
  Radio: FormRadio,
});
