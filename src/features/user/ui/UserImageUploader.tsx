interface UserImageUploaderProps {
  image: File | string;
  onImageChange: (file: File) => void;
}

export const UserImageUploader = ({ image, onImageChange }: UserImageUploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div className="relative h-24 w-24">
      <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-dark-gray hover:border-mid-gray">
        {image && (
          <img
            src={typeof image === 'object' ? URL.createObjectURL(image) : image}
            alt="프로필 이미지"
            className="absolute h-full w-full rounded-full object-cover"
          />
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        {!image && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </label>
    </div>
  );
};
