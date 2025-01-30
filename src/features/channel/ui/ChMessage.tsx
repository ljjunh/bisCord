import { useParams } from 'react-router-dom';

const ChMessage = () => {
  const { '*': channelId } = useParams();
  const ChNumId = Number(channelId);
  console.log(ChNumId);
  //   const socketClient = useWebSocket();

  //   useEffect(() => {
  //     if (!socketClient) return;

  //     const subscription = socketClient.subscribe(`/topic/channel/${ChNumId}`, (message) => {

  //         try {
  //             const data: Message = JSON.parse(message.body)
  //         }
  //     });
  //   });

  return <div className="flex w-full flex-col"></div>;
};

export default ChMessage;
