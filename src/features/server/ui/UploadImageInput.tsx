import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UploadImageInputProps {
  onChange: (imageData: string | File) => void;
  value?: File | string;
}

const UploadImageInput = ({ onChange, value }: UploadImageInputProps) => {
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>('');

  useEffect(() => {
    if (typeof value === 'string' && value) {
      setImageFile(value);
    }
  }, [value]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result;
        setImageFile(result); // 이미지 미리보기 설정
        onChange(file); // 부모 컴포넌트로 이미지 전달
      };
    }
  };

  return (
    <div
      className={`relative flex aspect-[1/1] w-[30%] cursor-pointer items-center justify-center rounded-[50%] ${imageFile ? 'overflow-hidden' : 'border-2 border-dashed border-light-gray'} `}
    >
      <label className="flex h-full w-full cursor-pointer items-center justify-center">
        {imageFile ? (
          <div
            className={`h-full w-full`}
            style={{
              backgroundImage: `url(${imageFile})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        ) : (
          <>
            <div className="absolute right-0 top-0 rounded-[50%] bg-blue p-2">
              <PlusIcon
                size={20}
                color="#ffffff"
              />
            </div>
            <div className="text-lg font-semibold text-light-gray">UPLOAD</div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeFile}
        />
      </label>
    </div>
  );
};

export { UploadImageInput };
