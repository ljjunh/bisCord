import { useRTCStore } from '@/shared/model/RTCStore';
import { CallIcon } from '@/shared/icons/CallIcon';
import { XIcon } from '@/shared/icons/XIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

export const CallNotification = () => {
  //   const { inComingCall, handleIncomingCall, clearIncomingCall, endCall } = useRTCStore();
  const { inComingCall } = useRTCStore();

  if (!inComingCall) return null;

  return (
    <div className="absolute left-0 top-0 z-10 flex h-[200px] w-full flex-col items-center justify-center gap-5 rounded-md bg-black p-4">
      <p className="text-center text-xl text-white">님이 통화를 요청했습니다.</p>
      <div className="flex gap-4">
        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-green p-3.5 hover:opacity-80">
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

        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-red p-4 hover:opacity-80">
                <XIcon
                  size={15}
                  color="#ffffff"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>닫기</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
