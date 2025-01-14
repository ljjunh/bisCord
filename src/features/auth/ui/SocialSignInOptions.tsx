import { SOCIAL_PROVIDERS } from '../model/constants';
import { SocialSignInOption } from './SocialSignInOption';

export const SocialSignInOptions = () => {
  return (
    <nav
      className="mt-6 flex justify-center gap-5"
      aria-label="소셜 로그인"
    >
      {SOCIAL_PROVIDERS.map((provider) => (
        <SocialSignInOption
          key={provider.name}
          icon={provider.icon}
          name={provider.name}
          href={provider.href}
        />
      ))}
    </nav>
  );
};
