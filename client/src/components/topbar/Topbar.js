import "./topbar.css"

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="topbarLeftTitleWrapper">
          <i class="topbarRoomIcon material-icons">chat_bubble_outline</i>
          <h3 className="topbarLeftTitle">chat room title</h3>
        </div>
        <button className="topbarLeftFollowButton">Follow</button>
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
