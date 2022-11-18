import "./online.css"

export default function Online({ user }) {
  return (
    <li className="rightSidebarFriend">
      <div className="rightSidebarProfileImgContainer">
        {user?.thumbnail 
            ? <img className="rightSidebarProfileImg" src={user?.thumbnail} alt="" />
            : <i class="rightSidebarProfileImg rightSidebarProfileDefaultImg material-icons">account_circle</i>
        }
        <span className="rightSidebarOnline"></span>
      </div>
      <span className="rightSidebarUsername">{user.username}</span>
    </li>
  )
}
