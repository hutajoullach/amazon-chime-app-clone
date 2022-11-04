import Topbar from "../../components/topbar/Topbar";
import LeftSidebar from "../../components/leftSidebar/LeftSidebar";
import Board from "../../components/board/Board";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import "./home.css"

export default function Home() {
  return (
    <div className="home">
      <LeftSidebar />
      <div className="homeContainer">
        <Topbar />
        <div className="homeContainerBottom">
          <Board />
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
