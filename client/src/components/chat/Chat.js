import { useEffect, useState } from "react";
import Message from "../message/Message";
import "./chat.css";
import axios from "axios";

export default function Chat({ channelId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/messages/channel/${channelId}`);
      setMessages(res.data)
    };
    if(channelId) {
      fetchMessages();
    }
  }, [channelId])


  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      // here we just save the last cursor position inside the window object in a new property, so we can access it globally
      window.pos = [e.clientX, e.clientY];
    })

    window.addEventListener('keydown', (e) => {
      // using the elementFromPoint method to determine what the element is under the cursor, by accessing our saved position
      // console.log(document.elementFromPoint(window.pos[0], window.pos[1]))

      const elementUnderCursor = document.elementFromPoint(window.pos[0], window.pos[1]);

      let userInputText = "text-placeholder";
      setTimeout(function() {
        userInputText = document.querySelector("[data-user-input]").firstChild;

        if (elementUnderCursor?.nextElementSibling?.className !== "placeholder" && elementUnderCursor?.previousElementSibling?.className !== "placeholder" && elementUnderCursor?.className === "userInput" && userInputText === null && e.key === "Backspace") {
          const tag = document.createElement("span");
          tag.setAttribute("data-placeholder", "Type a chat message");
          tag.classList.add("placeholder");
          tag.contentEditable = "true";
          tag.onkeypress = function(e){ updateInput(e.key) };
          // tag.onKeyPress = function(e){ updateInput(e.key) };
          tag.setAttribute("style", "content: attr(data-placeholder), color: #4F5660, height: 100%, width: 100%, display: flex, align-items: center, user-select: none");
          elementUnderCursor.parentNode.appendChild(tag);
          elementUnderCursor.remove();
          tag.scrollLeft = tag.scrollWidth;
        }
      }, 100);
    });
  }, [])


  async function handleSubmit(e) {
    // e.preventDefault();
    // e.stopPropagation();
    // if (e.target.tagName !== "SPAN") return;

    const formInputElm = document.querySelector("[data-form-input]");

    if (e.key === "Enter") {
      if(formInputElm.firstElementChild.className === "userInput" && formInputElm.firstElementChild.firstChild.data) {
        const userInputText = formInputElm.firstElementChild.firstChild.data
        formInputElm.firstElementChild.firstChild.nodeValue = "";
        
        const newMessage = {
          message: userInputText,
          creator: "635d8cf65d178a55b6cdb92a"
          // selectedFile: null,
          // repliedMessage: null
        }

        try {
          const res = await axios.post(`http://localhost:5000/messages/channel/${channelId}`, newMessage);
          setMessages([...messages, res.data])
        } catch (err) {
          console.log(err);
          return;
        }
      }
      formInputElm.firstElementChild.remove();
      const tag = document.createElement("span");
      tag.setAttribute("data-placeholder", "Type a chat message");
      tag.classList.add("placeholder");
      tag.contentEditable = "true";
      tag.setAttribute("style", "content: attr(data-placeholder), color: #4F5660, height: 100%, width: 100%, display: flex, align-items: center, user-select: none");
      formInputElm.appendChild(tag);
      formInputElm.firstElementChild.scrollLeft = formInputElm.firstElementChild.scrollWidth;
    }
  }


  function updateInput(e) {
    const formInputElm = document.querySelector("[data-form-input]");
    const placeholder = document.querySelector("[data-placeholder]");
    const userInputElm = document.querySelector("[data-user-input]");

    if (e.key === "Enter" && userInputElm?.firstChild?.data !== "") {
      handleSubmit(e);
    }

    if (!placeholder && !userInputElm) {
      formInputElm.firstChild.remove()
      const tag = document.createElement("span");
      tag.setAttribute("data-placeholder", "Type a chat message");
      tag.classList.add("placeholder");
      tag.contentEditable = "true";
      tag.onkeypress = function(e){ updateInput(e.key) };
      // tag.onKeyPress = function(e){ updateInput(e.key) };
      tag.setAttribute("style", "content: attr(data-placeholder), color: #4F5660, height: 100%, width: 100%, display: flex, align-items: center, user-select: none");
      formInputElm.appendChild(tag);
      tag.scrollLeft = tag.scrollWidth;
    }

    if (e.key && placeholder) {
      placeholder.remove();
      const tag = document.createElement("span");
      const text = document.createTextNode(e.key);
      tag.appendChild(text);
      tag.setAttribute("data-user-input", "");
      tag.classList.add("userInput");
      tag.contentEditable = "true";
      tag.onkeypress = function(e){ updateInput(e.key) };
      // tag.onKeyPress = function(e){ updateInput(e.key) };
      tag.setAttribute("style", "width: 100%");
      // tag.setAttribute("style", "color: #4F5660, height: 100%, width: 100%, display: block, align-items: center, user-select: none");
      formInputElm.appendChild(tag);
      tag.scrollLeft = tag.scrollWidth;
    } else if (e.key && userInputElm) {
      // userInputElm.firstChild.nodeValue = userInputElm.firstChild.nodeValue + e.key;
      // formInputElm.firstChild.nodeValue = "";
      userInputElm.scrollLeft = userInputElm.scrollWidth;
    } else if (!placeholder && userInputElm.firstChild.data === "") {
      // if(e.key === "Delete" || e.key === "Backspace") {
      //   const tag = document.createElement("span");
      //   tag.setAttribute("data-placeholder", "Type a chat message");
      //   tag.classList.add("placeholder");
      //   tag.contentEditable = "true";
      //   tag.onkeypress = function(e){ updateInput(e.key) };
      //   // tag.onKeyPress = function(e){ updateInput(e.key) };
      //   tag.setAttribute("style", "content: attr(data-placeholder), color: #4F5660, height: 100%, width: 100%, display: flex, align-items: center, user-select: none");
      //   formInputElm.appendChild(tag);
      //   userInputElm.remove();
      //   tag.scrollLeft = tag.scrollWidth;
      // }
    }
  }
  
  return (
    <div className="chat">
      <div className="chatWrapper">
        <div className="chatContent">
          {messages.map((m) => (
            <Message key={m._id} message={m} />
          ))}
        </div>
        <form className="chatForm">
          <div className="chatFormContainer">
            <div className="chatFormInner">
              <div className="chatFormAttachWrapper">
                <button className="chatFormAttachButton">
                  <i class="material-icons">add_circle</i>
                </button>
              </div>
              <div className="chatFormInputContainer">
                <div className="chatFormInput" data-form-input="">
                  <span className="placeholder" onKeyPress={e => updateInput(e)} contentEditable={true} role="textbox" data-placeholder="Type a chat message" />
                </div>
              </div>
              <div className="chatFormButtons">
                <button className="chatFormButton">
                  <i class="material-icons">gif</i>
                </button>
                <button className="chatFormButton">
                  <i class="material-icons">insert_drive_file</i>
                </button>
                <button className="chatFormButton">
                  <i class="material-icons">tag_faces</i>
                </button>
              </div>
            </div>
          </div>
          <div className="chatUserAssist"></div>
        </form>
      </div>
    </div>
  )
}
