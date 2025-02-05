import { ActivityDetector } from 'activity-detector';
import { create } from 'zustand';

interface DetectorState {
  detector: ActivityDetector | null;
  setDetector: (detector: ActivityDetector) => void;
}

export const useDetectorStore = create<DetectorState>((set) => ({
  detector: null,
  setDetector: (detector) => set({ detector }),
}));
