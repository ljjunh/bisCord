import SearchIcon from '../icons/SearchIcon';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = '검색하기',
  className,
}: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="검색"
        className={`w-full rounded-md bg-black px-4 py-1.5 text-white focus:outline-none ${className}`}
      />
      {!value && (
        <span
          className="absolute right-3 top-2 h-5 w-5"
          aria-hidden="true"
        >
          <SearchIcon />
        </span>
      )}
    </div>
  );
};
