import { useEffect, useState } from "react";
import "./topbar.css"
import axios from "axios";

export default function Topbar({ channelId }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await axios.get("http://localhost:5000/messages/");
      setChannels(res.data)
    };
    fetchChannels();
  }, [])

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        {channels.map(c => (
          c._id === channelId && 
          <>
            <div className="topbarLeftTitleWrapper">
              <i class="topbarRoomIcon material-icons">chat_bubble_outline</i>
              <h3 className="topbarLeftTitle">{c.name}</h3>
            </div>
            <button className="topbarLeftFollowButton">func</button>
          </>
        ))}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <i class="topbarIconItem material-icons">chat</i>
          <i class="topbarIconItem material-icons">notifications_off</i>
          <i class="topbarIconItem material-icons">archive</i>
          <i class="topbarIconItem material-icons">people</i>
        </div>

        <div className="topbarSearch">
          <input placeholder="Search" className="topbarSearchInput" />
          <i class="topbarSearchIcon material-icons">search</i>
        </div>
        <div className="topbarIcons">
          <i class="topbarIconItem material-icons">inbox</i>
          <i class="topbarIconItem material-icons">help</i>
        </div>
      </div>
    </div>
  )
}
