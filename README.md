# bisCord
실시간 커뮤니케이션과 커뮤니티 구축을 위한 웹 애플리케이션입니다. 
사용자들이 서버를 생성하고, 채널을 통해 실시간으로 소통할 수 있는 플랫폼을 구현했습니다. 
개인 메시지, 음성 채팅, 사용자 상태 관리 등 현대적인 소통 플랫폼의 기능을 React 기반으로 개발했습니다.

# 기술 스택
- React : 컴포넌트 기반의 UI 라이브러리로써, vuejs보다는 높은 자율성을 가지며, 풍성한 생태계를 가지고 있다는 점에서 선택하게 되었습니다.
- TypeScript : 정적 타입 검사를 통해 개발 단계에서 오류를 사전에 방지하기 위해 선택했습니다.
- TailwindCSS : 별도의 CSS 파일 생성 없이 HTML 요소에 직접 클래스를 적용하여 개발 흐름을 끊지 않고 스타일링할 수 있어 선택했습니다.
- Zustand : 상태 관리 복잡성을 최소화하기 위해 선택했습니다. Redux와 비교했을 때, 보일러플레이트 없이 훅 기반의 직관적인 API를 제공한다고 생각했습니다.
- TanstackQuery : 서버 상태 관리를 위한 라이브러리로 캐싱, 재시도, 낙관적 업데이트 등 데이터 패칭과 관련된 복잡한 로직을 효과적으로 처리하기 위해 선택했스빈다.
- Stomp.js : 메시지 브로커 패턴을 통한 효율적인 양방향 통신을 위해 선택했습니다.
- Husky & lint-staged : 커밋 전 자동 린팅 및 포맷팅을 통해 코드 품질을 보장하고, CI/CD 이전에 로컬에서 문제를 조기에 발견하기 위해 사용했습니다.
- ReactHookForm : 불필요한 리렌더링을 최소화하는 효율적인 폼 관리 라이브러리로, 복잡한 폼 로직을 간결하게 작성하기 위해 선택했습니다.
- Zod : 타입스크립트와 완벽하게 통합되는 스키마 기반 검증 라이브러리로, 자동 타입 추론과 복잡한 유효성 검사 로직을 선언적으로 작성하기 위해 선택했습니다.
- ActivityDetector : 사용자의 활동 상태를 감지하기 위해 선택했습니다. 특히 채팅 애플리케이션에서 사용자의 온라인, 오프라인, 자리비움 상태를 자동으로 업데이트 하는 기능에 활용했습니다.
- ReactToastify : 사용자 피드백을 위한 토스트 알림을 일관된 방식으로 구현하기 위해 선택했습니다.

# FSD 아키텍처 적용
### 도입하게 된 이유 : 
프로젝트 규모가 확장됨에 따라 전통적인 폴더 구조(pages, components, hooks)에서 다음과 같은 한계점이 드러났습니다.
- 관련 기능이 여러 폴더에 분산되어 있어 개발 및 유지보수 효율성 저하
- 평면적인 컴포넌트 구조로 인한 컴포넌트 용도 및 관계 파악 어려움
- 기존 기능의 정확한 위치 식별 어려움으로 인한 중복 개발 발생
이러한 구조적 문제를 해결하기 위해 FSD를 도입했습니다.
### 도입하면서 느낀 어려움 : 
- `entities`와 `features` 레이어 간 경계가 모호한 사례 발생
- 팀원들의 새로운 아키텍처 적응 기간 필요
- 초기 구현 단계에서의 개발 속도 저하
### 도입한 뒤 느낀 장점 : 
- 코드 위치 예측 가능성 향상 : 기능과 컴포넌트의 위치를 직관적으로 예측 가능
- 중복 코드 감소 : 기능의 명확한 위치 정의로 중복 개발 방지
- 단방향 의존성 : 하위 레이어에서 상위 레이어를 참조하지 못하는 규칙 덕분에 의존성 구조가 명확해졌습니다. 이는 순환 참조 문제를 원천적으로 방지하고, 코드베이스의 안정성을 크게 높였습니다. 예를 들어 entities에 있는 코드가 features의 변경에 영향을 받지 않기 때문에, 기본 모델 변경 시 영향 범위를 쉽게 예측할 수 있었습니다.
  
FSD 도입은 단기적으로는 학습 곡선이 있었지만, 중장기적으로는 개발 생산성과 코드 품질 향상에 큰 도움이 되었습니다. 특히 프로젝트 규모가 커질수록 그 가치가 더 뚜렷해졌습니다. 처음 적용할 때 느꼈던 레이어 구분의 모호함은 팀 내 논의와 가이드라인 확립을 통해 점차 해소되었고, 팀 전체가 일관된 멘탈 모델을 공유하게 되어 협업 효율성이 크게 향상되었습니다.
무엇보다 "어떤 컴포넌트가 어디 있을지 예측 가능해져서 더 빨리 찾을 수 있고, 그만큼 중복 로직이 줄어든" 경험은 FSD 도입의 가장 큰 성과였습니다.

# 타입스크립트와 인터셉터를 활용한 네트워크 에러 처리 
### 1. 중앙집중식 에러 처리 레이어 : 
네트워크 통신 중 발생하는 다양한 에러 상황을 효율적으로 관리하기 위해 Axios 인터셉터 기반의 중앙집중식 에러 처리 레이어를 구축했습니다.
``` tsx
// 인터셉터 설정
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export const rejectInterceptor = async (error: AxiosError) => {
  if (NetworkOfflineErrorHandler.validate()) {
    throw new NetworkOfflineErrorHandler.Error();
  }

  if (UnknownErrorHandler.validate(error)) {
    throw new UnknownErrorHandler.Error();
  }

  if (isServerError(error)) {
    console.error(error.response?.data.message);
  }

  if (isTokenExpiredError(error)) {
    return TokenExpiredHandler.handleRefresh(error);
  }

  return Promise.reject(error);
};
```
이 접근 방식은 네트워크 오프라인, 서버 에러, 토큰 만료 등 공통적으로 발생하는 에러를 인터셉터 레벨에서 처리함으로써 하위 컴포넌트 코드의 간결성과 일관성을 보장합니다.

### 2. 타입 가드 기반 런타임 에러 식별 : 
각 에러 유형을 정확하게 식별하고 타입 안정성을 보장하기 위해 타입스크립트의 사용자 정의 타입 가드와 커스텀 에러 클래스를 결합한 에러 식별 체계를 구현했습니다.
``` tsx
// 서버 에러 식별 타입 가드
export const isServerError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return (
    isAxiosError(error) &&
    error.response !== undefined &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'errorDetails' in error.response.data
  );
};

// 토큰 만료 에러 식별 타입 가드
export const isTokenExpiredError = (error: Error): error is AxiosError<ApiErrorResponse> => {
  return (
    isServerError(error) &&
    isCustomRequestConfig(error.config) &&
    error.response?.data.status === 401 &&
    !error.config._retry &&
    error.response.data.errorDetails.errorName === 'UNAUTHORIZED_USER'
  );
};
```
이러한 타입 가드는 복잡한 조건 검증 로직을 의미 있는 함수명 뒤에 캡슐화하여, 개발자가 내부 구현을 이해하지 않고도 직관적으로 에러 처리를 할 수 있게 했습니다.
또한 표준화 된 에러 클래스를 구현하고 이를 검증 로직과 함께 핸들러 객체로 묶어 에러 처리의 응집도를 높였습니다. 이러한 설계 덕분에 새로운 에러 유형이 필요할 때 타입 가드와 에러 클래스만 추가하면 기존 시스템에 자연스럽게 통합되는 확장성을 확보할 수 있었습니다.

### 3. 백엔드 협업을 통한 사용자 친화적 에러 메시지 : 
백엔드 팀원과 협업을 통해 API 응답에 사용자 친화적인 에러 메시지를 포함하도록 설계했으며, 이를 TanstackQuery의 전역 에러 핸들러와 통합하여, 비즈니스 로직 관련 에러를 자동으로 사용자에게 표시하도록 했습니다.
``` tsx
export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _requestData, _context, mutation) => {
      if (mutation.meta?.ignoreToast) return;
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? '네트워크 연결상태가 좋지 않습니다.');
        return;
      }
      toast.error(error.message);
    },
  }),
});
```
이 접근법은 프론트엔드에서 에러 메시지를 하드코딩하는 부담을 제거하고, 에러 메시지 관리를 단순화했습니다. 백엔드에서 제공하는 메시지를 직접 활용함으로써 일관된 에러 메시지를 유지할 수 있었고, 메시지 변경 시 프론트엔드 코드 수정 없이 백엔드만 업데이트하면 되는 효율성을 확보했습니다.
더불어 `ignoreToast` 메타 옵션을 통해 특정 API 호출에서는 자동 에러 메시지 표시를 비활성화할 수 있는 유연성을 제공하여, 다양한 사용 사례에 대응할 수 있게 했습니다.

# 선언적 프로그래밍과 추상화를 통한 코드 가독성 향상
### 1. 의미 중심 유틸리티 함수 도입 : 
코드의 의도와 가독성을 향상시키기 위해 유틸리티 함수를 도입했습니다.
``` tsx
// 개선 전: 직접적인 길이 확인
if (allFriends.length === 0) {
  return <EmptyView />;
}

// 개선 후: 의미 중심의 isEmpty 함수 활용
if (isEmpty(allFriends)) {
  return <EmptyView />;
}
```
null, undefined, 빈 배열, 빈 객체 등 다양한 "빈"상태를 일관되게 처리했습니다.

### 2. 선언적 변수 추출 패턴 : 
복잡한 조건부 렌더링 로직의 가독성을 개선하기 위해 조건식을 의미하는 의미 있는 변수로 추출했습니다.
``` tsx
// 개선 전: 복잡한 인라인 조건식
if (Boolean(debouncedKeyword) && isEmpty(allFriends) && !isFetching) {
  return <EmptySearchResults />;
}

// 개선 후: 명확한 의미의 변수로 추출
const isNothingSearched = Boolean(debouncedKeyword) && isEmpty(allFriends) && !isFetching;
const isNotHaveFriends = !debouncedKeyword && isEmpty(allFriends) && !isFetching;

if (isNothingSearched) {
  return <EmptySearchResults />;
}
```
이 패턴은 코드의 의도를 명확히 전달하고, 조건 변경 시 한 곳만 수정하면 되는 유지보수 이점을 제공했습니다.

### 3. 제네릭 SwitchCase 컴포넌트 : 
탭 전환 및 조건부 렌더링이 필요한 여러 화면에서 동일한 패턴이 반복되는 문제를 발견했습니다. 반복적인 조건부 렌더링 패턴을 추상화하기 위해 타입스크립트의 제네릭을 활용한 SwitchCase 컴포넌트를 개발했습니다.
``` tsx
// 개선 전: 중첩된 조건문을 사용한 탭 전환 로직
{activeTab === 'online' && <OnlineFriendsView />}
{activeTab === 'all' && <AllFriendsView />}
{activeTab === 'pending' && <PendingFriendsView />}
{activeTab === 'add' && <AddFriendView />}

// 개선 후: SwitchCase 컴포넌트를 활용한 선언적 탭 전환
<SwitchCase
  value={activeTab}
  caseBy={{
    online: <OnlineFriendsView />,
    all: <AllFriendsView />,
    pending: <PendingFriendsView />,
    add: <AddFriendView />,
  }}
  defaultComponent={<AllFriendsView />}
/>
```
이 추상화를 통해 중복 코드를 제거하고, 조건부 렌더링 패턴의 일관성을 확보했습니다.

# 웹 성능 최적화
### 1. 코드 스플리팅 : 
라우트 기반 코드 스플리팅을 구현하여 초기 로딩 시 필요한 코드만 다운로드하도록 최적화했습니다. 이를 통해 메인 번들 크기가 감소하고 초기 로딩 시간이 단축되었습니다.
### 2. 폰트 최적화 : 
웹 폰트 최적화를 위해 서브셋 폰트 파일을 생성하고, `font-display: swap` 속성을 적용하여 폰트 로딩 중에도 시스템 폰트로 먼저 텍스트를 표시했습니다. 또한 폰트 파일에 프리로드를 적용하여 다른 리소스보다 먼저 로드되도록 우선순위를 높였습니다. 이러한 최적화로 폰트 파일 크기를 대폭 줄이고 FCP를 개선하여 사용자가 콘텐츠를 빠르게 볼 수 있도록 했습니다.
### 3. SEO 최적화 : 
`React-Helmet`을 활용해 각 페이지별 적절한 메타 태그와 OG 태그를 제공했습니다. 동적 페이지에도 필요한 메타데이터를 제공하고, `robots.txt`를 설정하여 검색 엔진 크롤러의 접근을 최적화했습니다.
### 4. 접근성 개선 : 
`div`나 `span` 태그를 지양하고, 시맨틱한 태그를 사용하기 위해 고민했습니다. `article`, `time`, `section`, `figure`, `nav`와 같은 태그들을 적절히 활용하였습니다. `h1` 태그 같은 경우에는 한 페이지당 하나만 존재하도록 작성하였으며, heading 요소들이 순서를 갖추어 화면을 구성할 수 있도록 작성했습니다. 또한 필요한 곳에서 `button`, `input`, `a` 태그를 목적에 맞게 활용함으로써, 모든 페이지에서 자연스러운 키보드 탐색이 가능하도록 했습니다. 상호작용 요소에는 적절한 `aria-label`을 제공하여 스크린 리더 사용자도 콘텐츠를 이해할 수 있게 했습니다.

### 5. 성과
로딩 성능 향상:
- FCP(First Contentful Paint): 1.9초 → 1.0초 (47.4% 개선)
- LCP(Largest Contentful Paint): 2.0초 → 1.4초 (30% 개선)

파일 크기 감소:
- 메인 번들 크기: 787KB → 541KB (31.3% 감소)
- 폰트 파일 크기: 2.1MB → 163KB (92.2% 축소)

품질 지표 향상:
- Lighthouse 성능 점수: 77점 → 93점
- SEO 점수: 78점 → 100점
- 접근성 점수: 86점 → 100점

# 배포 자동화 및 인프라 구성
### 1. CI/CD 파이프라인 구축 : 
개발 및 배포 프로세스의 일관성과 효율성을 위해 GitHub Actions 기반 CI/CD 파이프라인을 구축했습니다. 이를 통해 main 브랜치 병합 시 자동 빌드 및 배포가 이루어지도록 설정했으며, 수동 배포 과정에서 발생할 수 있는 인적 오류를 최소화했습니다.

### 2. 인프라 아키텍처 결정 : 
이 프로젝트는 서버 사이드 렌더링이 없는 순수 React SPA였기 때문에 정적 파일만 효율적으로 성빙할 수 있는 방식을 선택했습니다.
S3 정적 웹사이트 호스팅만으로도 충분했지만 다음과 같은 이유로 `CloudFront`, `Serverless Framework`를 함께 사용했습니다.

2.1. S3 단독 사용의 한계 
   - HTTPS 지원의 기술적 제약
   - SPA 라우팅 시 발생하는 404 오류 문제
   - 글로벌 사용자에 대한 지연 시간 최적화 부재

2.2. CloudFront 도입 이유 
   - 쉬운 HTTPS 설정
   - 404 오류를 index.html로 리다이렉트 하여 SPA 라우팅 문제 해결
   - 전 세계 엣지 로케이션을 통한 콘텐츠 전송 최적화

2.3. ServerLess Fromework 도입 이유 
   - AWS 리소스 생성을 코드로 관리
   - CloudFront 배포, S3 버킷 생성, 권한 설정 등을 자동화
   - 캐시 무효화 등 배포 후 작업 간소화
### 3. 결과적 이점 : 
- 비용 효율 : EC2 인스턴스 유지 비용 없이 사용량에 따른 지불
- 관리 부담 : 서버 패치, 스케일링, 모니터링 등의 관리 작업 불필요
- 성능 향상 : CloudFront 캐싱으로 글로벌 사용자 경험 개선
