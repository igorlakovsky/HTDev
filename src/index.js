import "antd/dist/antd.css";

function root() {
  const element = document.createElement("div");
  element.setAttribute("id", "root");

  return element;
}

document.body.appendChild(root());
