import { Hello } from "./features/hello/components/Hello";
import { TodoForm } from "./features/todo/components/TodoForm";
import { TodoList } from "./features/todo/components/TodoList";
import { useTodos } from "./features/todo/hooks/useTodos";
const App: React.FC = () => {
  const { todos, addTodo, updateTodo, completeTodo, deleteTodo } = useTodos();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-col min-h-screen">
        <TodoForm addTodo={addTodo} />
        <main className="flex-1">
        <div className="grid grid-cols-[24rem_24rem] justify-center gap-8 p-10">
          <div>
            <h2>🌟 uncompleted</h2>
            <TodoList
              todos={todos.filter((todo) => !todo.completed)}
              updateTodo={updateTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          </div>
          <div>
            <h2>💰 completed</h2>
            <TodoList
              todos={todos.filter((todo) => todo.completed)}
              updateTodo={updateTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
        </main>
        <footer>
          <Hello />
        </footer>
      </div>
    </div>
  );
};

export default App;
