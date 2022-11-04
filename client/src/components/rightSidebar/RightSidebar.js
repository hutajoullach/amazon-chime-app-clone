import "./rightSidebar.css"
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function RightSidebar() {
  return (
    <div className="rightSidebar">
      <div className="rightSidebarWapper">
        <div className="userStatusContainer">
          <h4 className="rightSidebarTitle">Team 1</h4>
          <ul className="rightSidebarFriendList">
            {Users.map(u => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
