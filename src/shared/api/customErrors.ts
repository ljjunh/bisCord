export class NetworkOfflineError extends Error {
  constructor() {
    super('네트워크 연결을 확인해주세요');
    this.name = 'NetworkOfflineError';
  }
}

export class UnknownError extends Error {
  constructor() {
    super('원인 불명의 에러입니다. 고객센터로 문의해주세요.');
    this.name = 'UnknownError';
  }
}
