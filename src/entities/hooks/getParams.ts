import { useParams } from 'react-router-dom';

/** 현재 경로에서 Params를 가져오는 Hook */
const useGetParams = <T extends Record<string, string | undefined>>() => {
  return useParams<T>();
};

export default useGetParams;
