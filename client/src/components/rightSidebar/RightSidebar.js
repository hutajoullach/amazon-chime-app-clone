import { useEffect, useState } from "react";
import "./rightSidebar.css"
import Online from "../online/Online";
import axios from "axios";

export default function RightSidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/messages/user");
      setUsers(res.data)
    };
    fetchUsers();
  }, [])

  return (
    <div className="rightSidebar">
      <div className="rightSidebarWapper">
        <div className="userStatusContainer">
          <h4 className="rightSidebarTitle">Guests</h4>
          <ul className="rightSidebarFriendList">
            {users.map(u => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
