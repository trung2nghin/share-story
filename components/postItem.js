const style = `
        // *{
        //     margin:0;
        //     padding: 0;
        // }
        // .list-post {
        //     width: 60%;
        //     margin: auto;
        // }
        .post-item {
            border: 1px solid #dbdbdd;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            font-family: 'Roboto Mono', monospace;
            font-size: 16px;
        }
        // html {
        //     /* font-family: 'Nunito', sans-serif; */
        //     font-family: 'Roboto Mono', monospace;
        //     font-size: 16px;
        // }
        .author-name {
            font-weight: 600;
            margin-bottom: 10px;
        }
        .time {
            font-size: 12px;
            margin-bottom: 10px;
        }
`;
import { convertDate } from "../utils.js"

class PostItem extends HTMLElement {
  constructor() {
    super();
    this._shadowDom = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.author = this.getAttribute("author");
    this.time = convertDate(this.getAttribute("time"));
    this.content = this.getAttribute("content");
    this._shadowDom.innerHTML = `
        <style>
          ${style}
        </style> 
        <div class="post-item">
            <div class="author-name">${this.author}</div>
            <div class="time">${this.time}</div>
            <div class="content">${this.content}</div>
        </div>
      `;
  }
}
window.customElements.define("post-item", PostItem);