import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./board.css";
import axios from "axios";
// import { Posts } from "../../dummyData";

export default function Board() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get("/channel/635d8f0e3b586521aca7d2ec");
      console.log(res);
    };
    fetchMessages();
  }, [])

  return (
    <div className="board">
      <div className="boardWrapper">
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  )
}
