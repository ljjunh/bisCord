import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const UploadImageInput = () => {
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);

  const handleChaneFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageFile(reader.result); // 파일의 Base64 데이터 설정
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
          onChange={handleChaneFile}
        />
      </label>
    </div>
  );
};

export { UploadImageInput };
