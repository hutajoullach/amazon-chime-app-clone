import "./closeFriend.css"

export default function CloseFriend({ user }) {
  return (
    <li className="leftSidebarFriend">
      {/* <img className="leftSidebarFriendImg" src="" alt="" /> */}
      <div className="leftSidebarFriendIcon"></div>
      <span className="leftSidebarFriendName">{user.username}</span>
    </li>
  )
}
