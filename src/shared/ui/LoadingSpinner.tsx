interface LoadingSpinnerProps {
  size?: number;
  mainColor?: string;
  subColor?: string;
  border?: number;
}

export const LoadingSpinner = ({
  size = 6,
  mainColor = 'white',
  subColor = 'gray',
  border = 4,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center py-4">
      <div
        className={`h-${size} w-${size} animate-spin rounded-full border-${border} border-${mainColor} border-t-${subColor}`}
      />
    </div>
  );
};
