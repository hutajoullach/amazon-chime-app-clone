import "./topbar.css"

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="topbarLeftTitleWrapper">
          <h3 className="topbarLeftTitle">chat room title</h3>
        </div>
        <button className="topbarLeftFollowButton">Follow</button>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem"></div>
          <div className="topbarIconItem"></div>
          <div className="topbarIconItem"></div>
        </div>
        <div className="searchbar">
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
    </div>
  )
}
