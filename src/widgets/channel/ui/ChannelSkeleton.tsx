export const ChannelSkeleton = () => {
  return (
    <div className="flex w-full bg-mid-gray">
      <div className="w-[250px] bg-dark-gray"></div>
      <div className="h-full flex-grow bg-mid-gray"></div>
      <div className="hidden w-[250px] bg-dark-gray lg:flex"></div>
    </div>
  );
};
