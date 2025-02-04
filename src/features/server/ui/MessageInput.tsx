interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit: (message: string) => void;
}

const MessageInput = ({ value, onChange, placeholder, onSubmit }: MessageInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    onSubmit(value); // Pass the current message to the parent
  };

  return (
    <div className="w-full px-4 pb-6">
      <form
        onSubmit={handleSubmit}
        className="flex h-[45px] w-full flex-row gap-2 overflow-hidden rounded-lg bg-gray"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray px-2 text-white focus:outline-none"
          placeholder={`# ${placeholder}에 메세지 보내기`}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export { MessageInput };
