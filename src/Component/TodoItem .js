import React from "react";
import styles from "./TodoItem.module.css"
class TodoItem extends React.Component {
  state = {
    editing: false,
  }
  handleUpdatedDone = event => {
    if (event.key === "Enter") {
      this.setState({ editing: false })
    }
  }
  
  handleUpdatedDone = event => {
    console.log(event.key)
  }
  render() {
    let viewMode = {}
let editMode = {}

if (this.state.editing) {
  viewMode.display = "none"
} else {
  editMode.display = "none"
}
    const completedStyle = {
      fontStyle: "italic",
      color: "#595959",
      opacity: 0.4,
      textDecoration: "line-through",
    }

    const { completed, id, title } = this.props.todo
    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing}>...</div>
        <input type="text" style={editMode} className={styles.textInput}   value={title}  onChange={e => {
    this.props.setUpdate(e.target.value, id)
  }}
  onKeyDown={this.handleUpdatedDone}/>
        <input
          type="checkbox"
          onChange={() => this.props.handleChangeProps(this.props.todo.id)}
        />{" "}
        {/* {this.props.todo.title} */}
        <button onClick={() => this.props.deleteTodoProps(this.props.todo.id)}>Delete</button>
        <span style={this.props.todo.completed ? completedStyle : null}>{title}
      {/* {this.props.todo.title} */}
    </span>
      </li>
    );
  }
}

export default TodoItem;

// import React from "react"

// function TodoItem(props) {
//   return <li>{props.todo.title}</li>
// }

// export default TodoItem