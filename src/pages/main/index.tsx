import { DMList } from '@/features/directMessage/ui/DMList';
import { FriendView } from '@/features/friend/ui/FriendView';
import { SEO_CONFIG } from '@/shared/constants/seo';
import { Seo } from '@/shared/ui/Seo';

const MainPage = () => {
  return (
    <>
      <Seo
        title={SEO_CONFIG.ROOT.title}
        description={SEO_CONFIG.ROOT.description}
        url={SEO_CONFIG.ROOT.url}
      />
      <div className="flex h-screen">
        <aside className="max-h-screen">
          <DMList />
        </aside>
        <main className="flex-1 overflow-hidden">
          <FriendView />
        </main>
      </div>
    </>
  );
};

export default MainPage;
