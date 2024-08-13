import { useEffect, useState } from "react";
import "./styles.css";
import api from "../../api/api";

function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

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
      if (editing) {
        await api.put(`/updateItem/${editing.id}`, {
          title,
          author,
        });
        setEditing(null);
      } else {
        await api.post("/insertitem", {
          title,
          author,
        });
      }
      fetchBooks();
      setAuthor("");
      setTitle("");
    } catch (error) {
      console.error(`Erro ao inserir dados: ${error}`);
    }
  }

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditing(book);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/deleteitem/${id}`);
      fetchBooks();
    } catch {
      console.log("Erro ao excluir dados item");
    }
  };

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
        <button type="submit">{editing ? "Atualizar" : "Inserir"}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h1>Tabela de Livros</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Editar</button>
                <button onClick={() => handleDelete(book.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
