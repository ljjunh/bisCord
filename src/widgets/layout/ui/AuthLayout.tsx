import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/constants/routes';
import { DiscordIcon } from '@/shared/ui/icons/DiscordIcon';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}

export const AuthLayout = ({ children, title, subTitle }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-blue">
      <header className="absolute left-10 top-10">
        <Link
          to={ROUTES.ROOT}
          className="flex items-center gap-3"
        >
          <DiscordIcon
            size={40}
            color={'white'}
          />
          <div className="text-xl font-bold text-white">Biscord</div>
        </Link>
      </header>

      <section className="w-full max-w-md rounded-md bg-mid-gray p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subTitle && <p className="text-sm text-light-gray">{subTitle}</p>}
        </div>
        {children}
      </section>
    </main>
  );
};
