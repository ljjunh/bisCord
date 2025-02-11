import { SwitchCase } from '@/shared/ui/SwitchCase';
import { GoogleIcon } from '@/shared/ui/icons/GoogleIcon';
import { KakaoIcon } from '@/shared/ui/icons/KakaoIcon';
import { NaverIcon } from '@/shared/ui/icons/NaverIcon';
import { SOCIAL_PROVIDERS } from '../model/constants';
import { SocialSignInLink } from './SocialSignInLink';

export const SocialSignInLinks = () => {
  return (
    <nav
      className="mt-6 flex justify-center gap-5"
      aria-label="소셜 로그인"
    >
      {SOCIAL_PROVIDERS.map((provider) => (
        <SocialSignInLink
          key={provider.name}
          icon={() => (
            <SwitchCase
              value={provider.name}
              caseBy={{
                Google: <GoogleIcon />,
                Kakao: <KakaoIcon />,
                Naver: <NaverIcon />,
              }}
            />
          )}
          name={provider.name}
          href={provider.href}
        />
      ))}
    </nav>
  );
};
