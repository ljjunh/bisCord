interface IListContainerProps {
  children: React.ReactNode;
}

/** 채널 목록 및 디엠친구 목록 UI container */
const ListContainer = ({ children }: IListContainerProps) => {
  return (
    <div className="flex h-full w-[250px] min-w-[250px] flex-col gap-4 rounded-tl-[10px] bg-dark-gray">
      {children}
    </div>
  );
};

export default ListContainer;
