declare module 'activity-detector' {
  type EventType = 'active' | 'idle';

  interface ActivityDetectorOptions {
    // 비활성 상태로 전환되기까지의 시간(밀리초)
    timeToIdle?: number;
    // 사용자를 활성 상태로 전환시키는 이벤트 목록
    activityEvents?: string[];
    // 강제로 비활성 상태로 전환시키는 이벤트 목록
    inactivityEvents?: string[];
    // 비활성 상태에서 무시할 이벤트 목록
    ignoredEventsWhenIdle?: string[];
    // 초기 상태 설정
    initialState?: EventType;
    // 자동 초기화 여부
    autoInit?: boolean;
  }

  interface ActivityDetector {
    on(event: EventType, listener: () => void): () => void;
    init(initialState?: EventType): void;
    stop(): void;
  }

  export default function activityDetector(options?: ActivityDetectorOptions): ActivityDetector;
}
