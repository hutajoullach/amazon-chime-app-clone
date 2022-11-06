import "./leftSidebar.css"
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <div className="leftSidebar">
      <div className="leftSidebarWrapper">
        <div className="leftSidebarContainer">
          <ul className="leftSidebarList">
            <li className="leftSidebarListItem">
              <i class="leftSidebarIcon material-icons">chat_bubble_outline</i>
              <span className="leftSidebarListItemText">Feed</span>
            </li>
            <li className="leftSidebarListItem">
              <i class="leftSidebarIcon material-icons">chat_bubble_outline</i>
              <span className="leftSidebarListItemText">Booking</span>
            </li>
          </ul>
          <button className="leftSidebarButton">Invite Contact</button>
          <div className="leftSidebarDivider"></div>
          <ul className="leftSidebarFriendList">
            {Users.map((u) => (
              <CloseFriend key={u.id} user={u} />
            ))}
          </ul>
        </div>
        <div className="leftSidebarPanel">
          <div className="leftSidebarPanelContainer">
            <Link to="/profile/username" style={{ textDecoration: "none" }}>
              <div className="leftSidebarPanelAvatarWrapper">
                <div className="leftSidebarPanelAvatar">
                  <i class="leftSidebarPanelAvatarIcon material-icons">person_pin</i>
                </div>
                <div className="leftSidebarPanelAvatarNameTag">
                  <span className="leftSidebarPanelAvatarName">Huta Joullach</span>
                  {/* <span className="leftSidebarPanelAvatarUserId">#2621</span> */}
                </div>
              </div>
            </Link>
            <div className="leftSidebarPanelIcons">
              <button className="leftSidebarPanelIconItem">
                <i class="material-icons">mic_off</i>
                {/* <i class="material-icons">mic</i> */}
              </button>
              <button className="leftSidebarPanelIconItem">
                <i class="material-icons">headset</i>
              </button>
              <button className="leftSidebarPanelIconItem">
                <i class="material-icons">settings</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
