import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Modal from "./components/Modal"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState({
    title: "",
    description: "",
    date: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState({
    title: "",
    description: "",
    date: "",
  })

  const API_URL = "http://192.168.68.115:8000/todos"

  async function getTodos() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setTodos(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((values) => ({ ...values, [name]: value }))
    console.log(value)
  }

  async function createTodo() {
    if (!input.title || !input.title.trim()) return
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    const newTodo = await response.json()
    setTodos([...todos, newTodo])
    setInput({ title: "", description: "", date: "" })
    console.log(input)
  }
  const handleEdit = (e) => {
    const { name, value } = e.target
    setEditText((values) => ({ ...values, [name]: value }))
    console.log(value)
  }

  async function updateTodo(id) {
    if (!editText.title || !editText.title.trim()) return
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editText),
    })
    const updatedTodo = await response.json()
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
    setEditingId(null)
    setEditText({ title: "", description: "", date: "" })
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="rounded-3xl border p-4">
          <h2 className="m-2 font-bold">Todo App</h2>

          <div>
            <Dialog>
              <form>
                <DialogTrigger
                  render={<Button variant="outline">Add Task</Button>}
                />
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                  </DialogHeader>

                  <Input
                    type="text"
                    name="title"
                    value={input.title || ""}
                    onChange={handleChange}
                    placeholder="Add new task"
                  />
                  <Input
                    type="text"
                    name="description"
                    value={input.description || ""}
                    onChange={handleChange}
                    placeholder="Add description"
                  />
                  <Input
                    type="date"
                    name="date"
                    value={input.date || ""}
                    onChange={handleChange}
                    placeholder="Add date"
                  />

                  <DialogFooter>
                    <DialogClose
                      render={<Button variant="outline">Cancel</Button>}
                    />
                    <Button onClick={createTodo} type="button" className="">
                      Add
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {editingId === todo.id ? (
                  <>
                    <Input
                      name="title"
                      type="text"
                      value={editText.title || ""}

                      onChange={handleEdit}
                    />
                    <Input
                      name="description"
                      type="text"
                      value={editText.description || ""}

                      onChange={handleEdit}
                    />
                    <Input
                      name="date"
                      type="date"
                      value={editText.date || ""}

                      onChange={handleEdit}
                    />
                    <Button
                      type="button"
                      className=""
                      onClick={() => updateTodo(todo.id)}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      className=""
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="justify flex items-center justify-between">
                      <div className="border border-transparent p-1.5">
                        <div className="flex gap-3 border-b">
                          <p> {todo.title}</p>
                          <p>{todo.description}</p>
                          <p> {todo.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          className=""
                          onClick={() => {
                            setEditingId(todo.id)
                            setEditText({
                              title: todo.title || "",
                              description: todo.description || "",
                              date: todo.date || "",
                            })
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
