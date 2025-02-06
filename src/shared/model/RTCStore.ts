import { create } from 'zustand';
import { WebRTCSignalData, WebRTCSignalMessage } from './types';
import { useAuthStore } from './authStore';
import { useSocketStore } from './socketStore';

interface RTCState {
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  isCallInProgress: boolean;
  targetUserId: number | null;
  inComingCall: {
    userId: number | null;
    userName: string | null;
    signalData: WebRTCSignalData | null;
  } | null;

  setLocalStream: (stream: MediaStream) => void;
  resetLocalStream: () => void;

  createPeerConnection: () => RTCPeerConnection;
  startCall: (targetUserId: number) => Promise<void>;

  handleIncomingCall: (data: WebRTCSignalData) => Promise<void>;
  handleCallAccepted: (data: WebRTCSignalData) => Promise<void>;
  handleNewICECandidate: (candidate: RTCIceCandidate) => Promise<void>;
  endCall: () => void;
  sendSignal: (message: WebRTCSignalMessage) => void;
  setIncomingCall: (userId: number, userName: string, signalData: WebRTCSignalData) => void;
  clearIncomingCall: () => void;
}

export const useRTCStore = create<RTCState>((set, get) => ({
  peerConnection: null,
  localStream: null,
  isCallInProgress: false,
  targetUserId: null,
  inComingCall: null,

  setLocalStream: (stream: MediaStream) => set({ localStream: stream }),

  // 마이크 스트림 정리
  resetLocalStream: () => {
    const { localStream } = get();
    if (localStream) {
      // 마이크 사용을 실제로 중지
      localStream.getTracks().forEach((track) => track.stop());
    }
    set({ localStream: null });
  },

  createPeerConnection: () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // { urls: 'stun:stun1.l.google.com:19302' },
        // { urls: 'stun:stun2.l.google.com:19302' },
        // { urls: 'stun:stun3.l.google.com:19302' },
        // { urls: 'stun:stun4.l.google.com:19302' },
        {
          urls: 'turn:34.22.88.184:3478',
          username: 'elice',
          credential: 'elice',
        },
      ],
      iceTransportPolicy: 'all',
    });

    const { sendSignal, targetUserId } = get();
    const myUserId = useAuthStore.getState().user?.id;
    const myUserName = useAuthStore.getState().user?.name;

    if (!myUserId || !targetUserId || !myUserName) return peerConnection;

    // ICE candidate 이벤트 처리
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        if (event.candidate) {
          sendSignal({
            operation: 'SEND',
            type: 'CALL_ICE',
            data: {
              fromUserId: myUserId,
              fromUserName: myUserName,
              toUserId: targetUserId,
              candidate: event.candidate,
            },
          });
        }
      }
    };

    // 원격 스트림 받았을 때 처리
    peerConnection.ontrack = (event) => {
      const remoteAudio = new Audio();
      remoteAudio.srcObject = event.streams[0];
      remoteAudio.play();
    };

    set({ peerConnection });
    return peerConnection;
  },

  startCall: async (targetUserId: number) => {
    const { localStream, createPeerConnection, sendSignal } = get();
    const myUserId = useAuthStore.getState().user?.id;
    const myUserName = useAuthStore.getState().user?.name;
    if (!localStream || !myUserId || !myUserName) return;

    const peerConnection = createPeerConnection();

    // 로컬 스트림 추가
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Offer 생성 및 전송
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      if (!offer.sdp) throw new Error('SDP가 없습니다.');

      // offer를 상대방에게 전송

      sendSignal({
        operation: 'SEND',
        type: 'CALL_OFFER',
        data: {
          fromUserId: myUserId,
          fromUserName: myUserName,
          toUserId: targetUserId,
          description: new RTCSessionDescription({
            type: offer.type,
            sdp: offer.sdp,
          }),
        },
      });

      set({ targetUserId, peerConnection });
    } catch (error) {
      console.error('오퍼 생성 중 에러', error);
    }
  },

  handleIncomingCall: async (data: WebRTCSignalData) => {
    const { localStream, createPeerConnection } = get();
    const myUserName = useAuthStore.getState().user?.name;

    if (!localStream || !data.description || !myUserName) {
      console.log('조건 체크 실패', { localStream, myUserName, description: data.description });
      return;
    }
    set({ targetUserId: data.fromUserId });
    const peerConnection = createPeerConnection();

    // 로컬스트림 추가하기
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // 받은 offer 설정
    await peerConnection.setRemoteDescription(data.description);

    // answer 생성 및 전송
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // answer 전송
    get().sendSignal({
      operation: 'SEND',
      type: 'CALL_ANSWER',
      data: {
        fromUserId: data.toUserId,
        fromUserName: myUserName,
        toUserId: data.fromUserId,
        description: new RTCSessionDescription({
          type: answer.type,
          sdp: answer.sdp,
        }),
      },
    });

    set({ isCallInProgress: true, targetUserId: data.fromUserId });
  },

  handleCallAccepted: async (data: WebRTCSignalData) => {
    console.log('handleCallAccepted 시작', data);
    const { peerConnection } = get();
    console.log('현재 peerConnection:', peerConnection);

    if (!peerConnection || !data.description) {
      console.log('peerConnection 또는 description 없음', {
        peerConnection,
        description: data.description,
      });
      return;
    }

    await peerConnection.setRemoteDescription(data.description);
    set({ isCallInProgress: true });
  },

  handleNewICECandidate: async (candidate: RTCIceCandidate) => {
    const { peerConnection } = get();
    if (!peerConnection) return;

    await peerConnection.addIceCandidate(candidate);
  },

  endCall: () => {
    const { peerConnection, resetLocalStream, targetUserId, sendSignal } = get();
    const myUserId = useAuthStore.getState().user?.id;
    const myUserName = useAuthStore.getState().user?.name;

    if (peerConnection) {
      peerConnection.close();
    }

    if (targetUserId && myUserId && myUserName) {
      sendSignal({
        operation: 'SEND',
        type: 'CALL_END',
        data: {
          fromUserId: myUserId,
          fromUserName: myUserName,
          toUserId: targetUserId,
        },
      });
    }

    resetLocalStream();
    set({
      peerConnection: null,
      isCallInProgress: false,
      targetUserId: null,
    });
  },

  sendSignal: (message: WebRTCSignalMessage) => {
    const socketClient = useSocketStore.getState().socketClient;
    if (!socketClient) return;

    socketClient.publish({
      destination: `/app/user/${message.data.toUserId}`,
      body: JSON.stringify(message),
    });
  },

  setIncomingCall: (userId: number, userName: string, signalData: WebRTCSignalData) =>
    set({ inComingCall: { userId, userName, signalData } }),

  clearIncomingCall: () => set({ inComingCall: null }),
}));
