import { useRTCStore } from '@/shared/model/store/RTCStore';
import { CallIcon } from '@/shared/icons/CallIcon';
import { cn } from '@/shared/lib/utils/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface CallButtonProps {
  otherUserId: number;
}

export const CallButton = ({ otherUserId }: CallButtonProps) => {
  const { setLocalStream, startCall, isCallInProgress } = useRTCStore();

  const handleButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setLocalStream(stream);

      // 마이크 권한 얻고 바로 통화 시작
      await startCall(otherUserId);
    } catch (error) {
      if (error instanceof Error && error.name === 'NotAllowedError') {
        confirm('마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
      } else {
        alert('마이크 권한이 필요합니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <button
            onClick={handleButtonClick}
            disabled={isCallInProgress}
            className={cn(isCallInProgress && 'cursor-not-allowed opacity-50')}
          >
            <CallIcon
              width={26}
              height={25}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCallInProgress ? '통화 중' : '음성 통화 시작하기'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
