import { useRTCStore } from '@/shared/model/RTCStore';
import { CallIcon } from '@/shared/icons/CallIcon';
import DiscordIcon from '@/shared/icons/DiscordIcon';
import { XIcon } from '@/shared/icons/XIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface CallViewProps {
  profileImageURL: string | null;
}

export const CallView = ({ profileImageURL }: CallViewProps) => {
  const {
    inComingCall,
    handleIncomingCall,
    isCallInProgress,
    clearIncomingCall,
    endCall,
    setLocalStream,
  } = useRTCStore();

  const handleAccept = async () => {
    try {
      // 마이크 권한 요청
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      setLocalStream(stream);

      if (inComingCall?.signalData) {
        await handleIncomingCall(inComingCall.signalData);
      }
      const audio = new Audio('/sounds/callstart.wav');
      audio.play().catch((error) => console.error('Audio play 실패:', error));
      clearIncomingCall();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          confirm('마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
        }
      } else {
        alert('마이크 권한이 필요합니다. 다시 시도해주세요.');
      }
      clearIncomingCall();
    }
  };

  const handleDecline = () => {
    const audio = new Audio('/sounds/callend.wav');
    audio.play().catch((error) => console.error('Audio play 실패:', error));

    endCall();
    clearIncomingCall();
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-[250px] w-full flex-col items-center justify-center gap-5 rounded-md bg-black p-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue">
        {profileImageURL ? (
          <img
            src={profileImageURL}
            alt="프로필"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <DiscordIcon
            size={40}
            color="#fff"
          />
        )}
      </div>
      <p className="text-center text-xl text-white">
        {isCallInProgress ? '통화중...' : `${inComingCall?.userName}님이 통화를 요청했습니다.`}
      </p>
      <div className="flex gap-4">
        {!isCallInProgress && (
          <TooltipProvider>
            <Tooltip delayDuration={0.1}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-green p-3.5 hover:opacity-80"
                >
                  <CallIcon
                    width={20}
                    height={20}
                    color="#ffffff"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>통화 참가하기</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <button
                onClick={handleDecline}
                className="rounded-full bg-red p-4 hover:opacity-80"
              >
                <XIcon
                  size={15}
                  color="#ffffff"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCallInProgress ? '통화 종료' : '닫기'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
