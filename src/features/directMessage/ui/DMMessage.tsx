import DmProfile from './DmProfile';

const DMMessage = () => {
  return (
    <div className="flex flex-grow bg-mid-gray">
      <div className="flex w-full flex-col">
        <div className="w-full flex-grow"></div>
        {/* <MessageInput
          placeholder=""
          value={inputMessage}
          onChange={setInputMessage}
          onSubmit={handleSendMessage}
        /> */}
      </div>
      <div className="hidden lg:block">
        <DmProfile />
      </div>
    </div>
  );
};

export default DMMessage;
