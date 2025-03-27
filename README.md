# FSD 아키텍처 적용
### 도입하게 된 이유
프로젝트 규모가 확장됨에 따라 전통적인 폴더 구조(pages, components, hooks)에서 다음과 같은 한계점이 드러났습니다.
- 관련 기능이 여러 폴더에 분산되어 있어 개발 및 유지보수 효율성 저하
- 평면적인 컴포넌트 구조로 인한 컴포넌트 용도 및 관계 파악 어려움
- 기존 기능의 정확한 위치 식별 어려움으로 인한 중복 개발 발생
이러한 구조적 문제를 해결하기 위해 FSD를 도입했습니다.
### 도입하면서 느낀 어려움
- entities와 features 레이어 간 경계가 모호한 사례 발생
- 팀원들의 새로운 아키텍처 적응 기간 필요
- 초기 구현 단계에서의 개발 속도 저하
### 도입한 뒤 느낀 장점
- 코드 위치 예측 가능성 향상 : 기능과 컴포넌트의 위치를 직관적으로 예측 가능
- 중복 코드 감소 : 기능의 명확한 위치 정의로 중복 개발 방지
- 단방향 의존성 : 하위 레이어에서 상위 레이어를 참조하지 못하는 규칙 덕분에 의존성 구조가 명확해졌습니다. 이는 순환 참조 문제를 원천적으로 방지하고, 코드베이스의 안정성을 크게 높였습니다. 예를 들어 entities에 있는 코드가 features의 변경에 영향을 받지 않기 때문에, 기본 모델 변경 시 영향 범위를 쉽게 예측할 수 있었습니다.
  
FSD 도입은 단기적으로는 학습 곡선이 있었지만, 중장기적으로는 개발 생산성과 코드 품질 향상에 큰 도움이 되었습니다. 특히 프로젝트 규모가 커질수록 그 가치가 더 뚜렷해졌습니다. 처음 적용할 때 느꼈던 레이어 구분의 모호함은 팀 내 논의와 가이드라인 확립을 통해 점차 해소되었고, 팀 전체가 일관된 멘탈 모델을 공유하게 되어 협업 효율성이 크게 향상되었습니다.
무엇보다 "어떤 컴포넌트가 어디 있을지 예측 가능해져서 더 빨리 찾을 수 있고, 그만큼 중복 로직이 줄어든" 경험은 FSD 도입의 가장 큰 성과였습니다.

# 타입스크립트와 인터셉터를 활용한 네트워크 에러 처리 
### 중앙집중식 에러 처리 레이어
네트워크 통신 중 발생하는 다양한 에러 상황을 효율적으로 관리하기 위해 Axios 인터셉터 기반의 중앙집중식 에러 처리 레이어를 구축했습니다.
```
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

### 타입 가드 기반 런타임 에러 식별
각 에러 유형을 정확하게 식별하고 타입 안정성을 보장하기 위해 타입스크립트의 사용자 정의 타입 가드와 커스텀 에러 클래스를 결합한 에러 식별 체계를 구현했습니다.
```
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

### 백엔드 협업을 통한 사용자 친화적 에러 메시지
백엔드 팀원과 협업을 통해 API 응답에 사용자 친화적인 에러 메시지를 포함하도록 설계했으며, 이를 TanstackQuery의 전역 에러 핸들러와 통합하여, 비즈니스 로직 관련 에러를 자동으로 사용자에게 표시하도록 했습니다.
```
export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _requestData, _context, mutation) => {
      if (mutation.meta?.ignoreToast) return;
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? '에러가 발생했습니다');
        return;
      }
      toast.error(error.message);
    },
  }),
});
```
이 접근법은 프론트엔드에서 에러 메시지를 하드코딩하는 부담을 제거하고, 에러 메시지 관리를 단순화했습니다. 백엔드에서 제공하는 메시지를 직접 활용함으로써 일관된 에러 메시지를 유지할 수 있었고, 메시지 변경 시 프론트엔드 코드 수정 없이 백엔드만 업데이트하면 되는 효율성을 확보했습니다.
더불어 ignoreToast 메타 옵션을 통해 특정 API 호출에서는 자동 에러 메시지 표시를 비활성화할 수 있는 유연성을 제공하여, 다양한 사용 사례에 대응할 수 있게 했습니다.

# 선언적 프로그래밍과 추상화를 통한 코드 가독성 향상
### 의미 중심 유틸리티 함수 도입
코드의 의도와 가독성을 향상시키기 위해 유틸리티 함수를 도입했습니다.
```
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

### 선언적 변수 추출 패턴
복잡한 조건부 렌더링 로직의 가독성을 개선하기 위해 조건식을 의미하는 의미 있는 변수로 추출했습니다.
```
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

### 제네릭 SwitchCase 컴포넌트
탭 전환 및 조건부 렌더링이 필요한 여러 화면에서 동일한 패턴이 반복되는 문제를 발견했습니다. 반복적인 조건부 렌더링 패턴을 추상화하기 위해 타입스크립트의 제네릭을 활용한 SwitchCase 컴포넌트를 개발했습니다.
```
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
