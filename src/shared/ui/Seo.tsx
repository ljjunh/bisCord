import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  url: string;
}

export const Seo = ({
  title,
  description,
  image = '/discord-icon.svg',
  siteName = 'biscord',
  url,
}: SeoProps) => {
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={description}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:site_name"
        content={siteName}
      />
      <meta
        property="og:title"
        content={fullTitle}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        property="og:url"
        content={url}
      />

      {image && (
        <>
          <meta
            property="og:image:width"
            content="1200"
          />
          <meta
            property="og:image:height"
            content="630"
          />
        </>
      )}

      <meta
        property="og:locale"
        content="ko_KR"
      />
    </Helmet>
  );
};
