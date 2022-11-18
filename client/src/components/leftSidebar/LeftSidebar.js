import { useEffect, useState, useContext } from "react";
import "./leftSidebar.css"
import Channel from "../channel/Channel";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function LeftSidebar() {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await axios.get("http://localhost:5000/messages/");
      setChannels(res.data)
    };
    fetchChannels();
  }, [])

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
          <button className="leftSidebarButton">Invite</button>
          <div className="leftSidebarDivider"></div>
          <ul className="leftSidebarFriendList">
            {channels.map((c) => (
              <Channel key={c.id} channel={c} />
            ))}
          </ul>
        </div>
        <div className="leftSidebarPanel">
          <div className="leftSidebarPanelContainer">
            <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
              <div className="leftSidebarPanelAvatarWrapper">
                <div className="leftSidebarPanelAvatar">
                  {user.thumbnail
                    ? <img src={ user.thumbnail } className="leftSidebarPanelAvatarIcon" alt="" />
                    : <i class="leftSidebarPanelAvatarIcon material-icons">person_pin</i>
                  }
                </div>
                <div className="leftSidebarPanelAvatarNameTag">
                  <span className="leftSidebarPanelAvatarName">{user?.username}</span>
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
