import { useEffect, useState } from "react";

const Pagination = ({ data }) => {
  const [todos, setTodos] = useState(data);
  const [currentPage, setCurrPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(20);

  const noOfPages = Math.ceil(todos?.length / todosPerPage);

  const idxOfFirstTodo = todosPerPage * (currentPage - 1);
  const idxOfLastTodo = todosPerPage * currentPage;

  const pages = [...Array(noOfPages || 0).keys()].map((i) => i + 1);

  //  data fetching
  async function fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pagination">
      <div>
        <label htmlFor="todoPerPage">Todo Per Page: </label>
        <input
          type="number"
          name=""
          id=""
          min={10}
          max={todos?.length + 1}
          step="10"
          value={todosPerPage}
          onChange={(e) => setTodosPerPage(e.target.value)}
        />
      </div>
      <div className="todo-wrap">
        {todos?.slice(idxOfFirstTodo, idxOfLastTodo)?.map((todo) => (
          <p key={todo.id}>
            {todo.id} {todo.title}
          </p>
        ))}
      </div>

      <div className="pagination-controls">
        {currentPage > 1 && (
          <button onClick={() => setCurrPage(currentPage - 1)}>prev</button>
        )}
        <div className="page-wrap">
          {pages.map((page) => (
            <span
              className={`${page === currentPage ? "active" : ""}`}
              onClick={() => setCurrPage(page)}
            >
              {" "}
              {page}{" "}
            </span>
          ))}
        </div>
        {currentPage < noOfPages && (
          <button onClick={() => setCurrPage(currentPage + 1)}>next</button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
