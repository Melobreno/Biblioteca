import { useEffect, useState } from "react";
import "./styles.css";
import api from "../../api/api";

function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("");
      setBooks(response.data);
    } catch (error) {
      console.error(`Erro ao buscar dados: ${error}`);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/insertitem", {
        title,
        author,
      });
      fetchBooks();
      setAuthor("");
      setTitle("");
    } catch (error) {
      console.error(`Erro ao inserir dados: ${error}`);
    }
  }

  return (
    <div>
      <h1>Inserir novo item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titulo: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Autor: </label>
          <input
            type="text"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <button type="submit">Inserir</button>
      </form>

      <h1>Tabela de Livros</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Autor</th>
          </tr>
        </thead>

        <tbody>
          {books.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
