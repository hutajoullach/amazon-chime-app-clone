import { useEffect, useState } from "react";
import "./message.css"
import axios from "axios";
import { format } from "timeago.js";

export default function Message({ message }) {
  const [user, setUser] = useState({});
  // const [icon, setIcon] = useState(message.icon);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/messages/user/${message.creator}`);
      setUser(res.data)
    };
    fetchUser();
  }, [message])

  const iconHandler = () => {
    try {
      // axios.put(`http://localhost:5000/messages/channel/${message.channel}/${message._id}/iconReply`, { clickedBy: currentUser._id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="message">
      <div className="messageWapper">
        <div className="messageReplyContext">
          <img alt="" src="" class="messageReplyProfileImg" />
          <span className="messageReplyUsername"></span>
          <div className="messageRepliedTextPreview"></div>
        </div>
        <div className="messageContents">
          {user?.thumbnail ? <img className="messageProfileImg" src={user?.thumbnail} alt="" /> : 
            <i class="messageProfileImg messageProfileDefaultImg material-icons">account_circle</i>
          }
          <div className="messageContext">
            <div className="messageHeader">
              <span className="messageUsername">{user?.username}</span>
              <span className="messageTimestamp">{format(message.updatedAt)}</span>
            </div>
            <span className="messageText">{message?.message}</span>
          </div>
        </div>
        <div className="messageImageContainer">
          <div className="messageImageWrapper">
            {/* <a class="originalLink" href=""></a> */}
            <div className="messageClickableWrapper">
              <img className="messageImg" src="" alt="" />
            </div>
          </div>
        </div>
        <div className="messageReactionWapper">
          <div className="messageReactions">
            <div className="messageReaction">
              <div className="messageReactionInner">
                <img className="messageReactionEmoji" src={message?.icon} onClick={iconHandler} alt="" />
                {message?.icon.map((i) => (
                  <span className="messageReactionCount">{i.iconCount}</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
