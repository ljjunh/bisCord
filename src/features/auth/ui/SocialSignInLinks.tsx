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
          icon={provider.icon}
          name={provider.name}
          href={provider.href}
        />
      ))}
    </nav>
  );
};
