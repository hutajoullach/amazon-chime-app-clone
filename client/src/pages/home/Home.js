import Topbar from "../../components/topbar/Topbar";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import Chat from "../../components/chat/Chat";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import "./home.css"
import { useParams } from "react-router-dom";

export default function Home() {
  const { channelId } = useParams();

  return (
    <div className="home">
      <LeftSidebar />
      <div className="homeContainer">
        <Topbar channelId={channelId} />
        <div className="homeContainerBottom">
          <Chat channelId={channelId} />
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
