import { DMHeader } from '@/features/directMessage/ui/DMHeader';
import { DMList } from '@/features/directMessage/ui/DMList';
import { DMView } from '@/features/directMessage/ui/DMView';
import { SEO_CONFIG } from '@/shared/model/constants/seo';
import { Seo } from '@/shared/ui/Seo';

const DirectMessagePage = () => {
  return (
    <>
      <Seo
        title={SEO_CONFIG.DIRECT_MESSAGE.title}
        description={SEO_CONFIG.DIRECT_MESSAGE.description}
        url={SEO_CONFIG.DIRECT_MESSAGE.url}
      />
      <div className="flex h-screen">
        <aside className="max-h-screen">
          <DMList />
        </aside>
        <main className="flex h-screen w-full flex-col">
          <DMHeader />
          <div className="flex-1 overflow-hidden">
            <DMView />
          </div>
        </main>
      </div>
    </>
  );
};

export default DirectMessagePage;
