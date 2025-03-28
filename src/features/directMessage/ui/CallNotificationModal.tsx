import { XIcon } from 'lucide-react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useRTCStore } from '@/shared/model/store/RTCStore';
import { useModalStore } from '@/shared/model/store/modalStore';
import { MODAL } from '@/shared/model/constants/modal';
import { ROUTES } from '@/shared/model/constants/routes';
import { CallIcon } from '@/shared/ui/icons/CallIcon';
import { DiscordIcon } from '@/shared/ui/icons/DiscordIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

const CallNotificationModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const { inComingCall, handleIncomingCall, clearIncomingCall, endCall, setLocalStream } =
    useRTCStore();
  const navigate = useNavigate();

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
      if (!inComingCall?.userId) return;

      navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(inComingCall?.userId));
      const audio = new Audio('/sounds/callstart.wav');
      audio.play().catch((error) => console.error('Audio play 실패:', error));
      onCloseModal();
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
    onCloseModal();
  };

  return (
    <ReactModal
      isOpen={type === MODAL.CALL_NOTIFICATION}
      ariaHideApp={false}
      role="dialog"
      aria-modal="true"
      overlayClassName="fixed inset-0 flex justify-center items-center"
      className="relative flex flex-col items-center space-y-4 overflow-hidden rounded-lg bg-[#000] px-10 py-5 text-center text-white shadow-lg outline-none"
    >
      <figure className="flex h-16 w-16 items-center justify-center rounded-full bg-blue">
        <DiscordIcon
          size={40}
          color="white"
        />
      </figure>

      <header className="flex flex-col">
        <h2 className="text-xl font-semibold">{inComingCall?.userName}</h2>
        <p className="text-sm text-super-light-gray">전화 수신중...</p>
      </header>

      <nav className="flex gap-4">
        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <button
                onClick={handleDecline}
                className="rounded-full bg-red p-4 hover:opacity-80"
                aria-label="통화 거절"
              >
                <XIcon
                  size={15}
                  color="#ffffff"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>거절</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <button
                onClick={handleAccept}
                className="rounded-full bg-green p-3.5 hover:opacity-80"
                aria-label="통화 참가하기"
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
      </nav>
    </ReactModal>
  );
};

export default CallNotificationModal;
