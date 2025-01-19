import { useForm } from 'react-hook-form';

export interface FormType {
  channel: string;
  server: string;
}

export const MODAL_FORM_DEFAULT_VALUES = {
  channel: '',
  server: '',
};

export const useModalForm = ({ defaultValues }: { defaultValues: FormType }) => {
  const methods = useForm<FormType>({ defaultValues });

  return methods;
};
