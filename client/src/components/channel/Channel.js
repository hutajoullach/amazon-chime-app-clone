import "./channel.css"
import { Link } from "react-router-dom";

export default function Channel({ channel }) {
  return (
    <li className="channel">
      <Link to={`/channel/${channel._id}`} className="channelWrapper">
        <div className="channelIconWrapper">
          <i class="channelIcon material-icons">chat_bubble_outline</i>
        </div>
        <span className="channelName">{channel.name}</span>
      </Link>
    </li>
  )
}
