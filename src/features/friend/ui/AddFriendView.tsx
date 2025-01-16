export const AddFriendView = () => {
  return (
    <>
      <div className="border-b">
        <div className="space-y-3 px-8 py-4">
          <h3 className="font-bold text-white">친구 추가하기</h3>
          <p className="text-sm text-super-light-gray">
            Biscord 사용자명을 사용하여 친구를 추가할 수 있어요.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Biscord 사용자명을 사용하여 친구를 추가할 수 있어요."
              className="flex-1 rounded-lg bg-black p-3 text-white"
            />
            <button className="rounded bg-blue px-4 py-2 text-white">친구 요청 보내기</button>
          </div>
        </div>
      </div>
      <div>요청목록</div>
    </>
  );
};
