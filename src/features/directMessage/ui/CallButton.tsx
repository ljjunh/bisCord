import { CallIcon } from '@/shared/icons/CallIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

export const CallButton = () => {
  const handleButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      console.log('마이크 권한 획득 성공', stream);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          confirm('마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
        }
      } else {
        alert('마이크 권한이 필요합니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <button onClick={handleButtonClick}>
            <CallIcon
              width={26}
              height={25}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>음성 통화 시작하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
