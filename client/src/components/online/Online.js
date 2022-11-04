import "./online.css"

export default function Online({ user }) {
  return (
    <li className="rightSidebarFriend">
      <div className="rightSidebarProfileImgContainer">
        <img className="rightSidebarProfileImg" src="" alt="" />
        <span className="rightSidebarOnline"></span>
      </div>
      <span className="rightSidebarUsername">{user.username}</span>
    </li>
  )
}
