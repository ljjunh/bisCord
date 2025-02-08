import { cn } from '../lib/utils';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = ({ message, className }: EmptyStateProps) => (
  <div className={cn('text-center text-sm text-super-light-gray', className)}>{message}</div>
);
