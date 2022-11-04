import Post from "../post/Post"
import "./board.css"
import { Posts } from "../../dummyData";

export default function Board() {
  return (
    <div className="board">
      <div className="boardWrapper">
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
