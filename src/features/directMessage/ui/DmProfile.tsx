import ProfileHeader from './ProfileHeader';

const DmProfile = () => {
  return (
    <div className="flex h-full w-[350px] flex-col bg-black">
      {/* profile heading */}
      <ProfileHeader />
      <div className=""></div>
      {/* profile contents */}
      <div className="px-4 text-xl font-semibold text-white">정경준</div>
    </div>
  );
};

export default DmProfile;
