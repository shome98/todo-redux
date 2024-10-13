import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {


  return (
    <>
      <TodoProvider>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <TodoList/>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
