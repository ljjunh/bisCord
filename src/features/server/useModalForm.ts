import { useForm } from 'react-hook-form';

export interface FormType {
  channel: string;
  server: string;
  type: 'TEXT' | 'VOICE';
}

export const MODAL_FORM_DEFAULT_VALUES: FormType = {
  channel: '',
  server: '',
  type: 'TEXT',
};

export const useModalForm = ({ defaultValues }: { defaultValues: FormType }) => {
  const methods = useForm<FormType>({ defaultValues });

  return methods;
};
