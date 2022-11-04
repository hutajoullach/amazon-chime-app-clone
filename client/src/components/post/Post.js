import "./post.css"
import { Users } from "../../dummyData";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWapper">
        <div className="postReplyContext">
          <img alt="" src="" class="postReplyProfileImg" />
          <span className="postReplyUsername"></span>
          <div className="postRepliedTextPreview"></div>
        </div>
        <div className="postContents">
          <img className="postProfileImg" src="" alt="" />
          <div className="postContext">
            <div className="postHeader">
              <span className="postUsername">{Users.filter(u => u.id === post.userId)[0].username}</span>
              <span className="postTimestamp">{post.date}</span>
            </div>
            <span className="postText">{post?.desc}</span>
          </div>
        </div>
        <div className="postImageContainer">
          <div className="postImageWrapper">
            <a class="originalLink" href=""></a>
            <div className="postClickableWrapper">
              <img className="postImg" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
