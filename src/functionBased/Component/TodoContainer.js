// import React from "react";
// import TodosList from "./TodosList";
// import Header from "./Header";
// import InputTodo from "./InputTodo";
// import { v4 as uuidv4 } from "uuid";
// class TodoContainer extends React.Component {
//   // state = {
//   //   todos: [
//   //     {
//   //       id: uuidv4(),
//   //       title: "Setup development environment",
//   //       completed: true,
//   //     },
//   //     {
//   //       id: uuidv4(),
//   //       title: "Develop website and add content",
//   //       completed: false,
//   //     },
//   //     {
//   //       id: uuidv4(),
//   //       title: "Deploy to live server",
//   //       completed: false,
//   //     },
//   //   ],
//   // };
//   state = {
//     todos: [],
//   }
//   handleChange = (id) => {
//     this.setState({
//       todos: this.state.todos.map((todo) => {
//         if (todo.id === id) {
//           todo.completed = !todo.completed;
//         }
//         return todo;
//       }),
//     });
//   };
//   delTodo = (id) => {
//     this.setState({
//       todos: [
//         ...this.state.todos.filter((todo) => {
//           return todo.id !== id;
//         }),
//       ],
//     });
//   };
//   addTodoItem = (title) => {
//     const newTodo = {
//       id: 4,
//       title: title,
//       completed: false,
//     };
//     this.setState({
//       todos: [...this.state.todos, newTodo],
//     });
//   };
//   setUpdate = (updatedTitle, id) => {
//     this.setState({
//       todos: this.state.todos.map((todo) => {
//         if (todo.id === id) {
//           todo.title = updatedTitle;
//         }
//         return todo;
//       }),
//     });
//   };
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
//       .then(response => response.json())
//       .then(data => this.setState({ todos: data }));
//   }
//   // componentDidMount() {
//   //   const temp = localStorage.getItem("todos")
//   //   const loadedTodos = JSON.parse(temp)
//   //   if (loadedTodos) {
//   //     this.setState({
//   //       todos: loadedTodos
//   //     })
//   //   }
//   // }
//   // componentDidUpdate(prevProps, prevState) {
//   //   if(prevState.todos !== this.state.todos) {
//   //     const temp = JSON.stringify(this.state.todos)
//   //     localStorage.setItem("todos", temp)
//   //   }
//   // }
//   render() {
//     return (
//       <div className="container">
//         <div className="inner">
//           <Header />
//           <InputTodo addTodoProps={this.addTodoItem} />
//           <TodosList
//             todos={this.state.todos}
//             handleChangeProps={this.handleChange}
//             deleteTodoProps={this.delTodo}
//             setUpdate={this.setUpdate}
//           />
//         </div>
//       </div>
//     );
//   }
// }
// export default TodoContainer;
import React, { useState , useEffect } from "react"
import Header from "./Header"
import InputTodo from "./InputTodo"
import TodosList from "./TodosList"
import { v4 as uuidv4 } from "uuid"
import { Route, Routes,Switch } from "react-router-dom"
import About from "./About"
import NotMatch from "./NotMatch"
import Navbar from "./Navbar"
const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos())
  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }
  const handleChange = id => {
    setTodos(prevState =>
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }

  const delTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id
      }),
    ])
  }

  const addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      })
    )
  }
  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])
  return (
    <>
     <Navbar />
   <Switch> 
  
   <Route path="/">
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodoItem} />
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={delTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
    </Route>
    <Route path="/about">
  <About />
</Route>
    <Route path="*">
      <NotMatch />
    </Route>
    </Switch>
  
  
    </>
  )
}

export default TodoContainer