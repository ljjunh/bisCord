interface SwitchCaseProps<T extends string> {
  value: T;
  caseBy: Record<T, JSX.Element>;
  defaultComponent?: JSX.Element | null;
}

export const SwitchCase = <T extends string>({
  value,
  caseBy,
  defaultComponent,
}: SwitchCaseProps<T>) => {
  if (value === null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
};
