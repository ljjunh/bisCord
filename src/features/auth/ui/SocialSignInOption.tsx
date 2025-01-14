import { Link } from 'react-router-dom';

interface SocialSignInOptionProps {
  icon: React.FC;
  name: string;
  href: string;
}

export const SocialSignInOption = ({ icon: Icon, name, href }: SocialSignInOptionProps) => {
  return (
    <Link
      to={href}
      className="hover:bg-super-light-gray flex h-14 w-14 items-center justify-center rounded-full bg-white"
      aria-label={`${name}로 로그인`}
    >
      <Icon />
    </Link>
  );
};
