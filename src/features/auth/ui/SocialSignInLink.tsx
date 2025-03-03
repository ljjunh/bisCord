import { Link } from 'react-router-dom';

interface SocialSignInLinkProps {
  icon: React.FC;
  name: string;
  href: string;
}

export const SocialSignInLink = ({ icon: Icon, name, href }: SocialSignInLinkProps) => {
  return (
    <Link
      to={href}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white hover:bg-super-light-gray"
      aria-label={`${name}로 로그인`}
    >
      <Icon />
    </Link>
  );
};
