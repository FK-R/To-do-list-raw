import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import Modal from "./components/Modal"
import { DeleteIcon, Edit2Icon } from "lucide-react"

export default function App() {
  const [todos, setTodos] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [input, setInput] = useState({
    title: "",
    description: "",
    date: "",
  })

  // Edit Task Modal State
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState({
    title: "",
    description: "",
    date: "",
  })

  const API_URL = "http://192.168.68.105:8000/todos"

  async function getTodos() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setTodos(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((values) => ({ ...values, [name]: value }))
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
    setIsAddOpen(false)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditText((values) => ({ ...values, [name]: value }))
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
    setIsEditOpen(false)
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
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-4 text-center text-xl font-bold">Todo App</h2>

        <div className="mb-6 flex justify-center">
          <Button variant="outline" onClick={() => setIsAddOpen(true)}>
            Add Task
          </Button>
        </div>

        <Modal
          isOpen={isAddOpen}
          onOpenChange={setIsAddOpen}
          title="Add Task"
          formValues={input}
          onChange={handleChange}
          onSubmit={createTodo}
          submitText="Add"
        />

        <Modal
          isOpen={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open)
            if (!open) setEditingId(null)
          }}
          title="Edit Task"
          formValues={editText}
          onChange={handleEditChange}
          onSubmit={() => updateTodo(editingId)}
          submitText="Save"
        />

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="border-b pb-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-sm">
                  <span className="text-base font-semibold">{todo.title}</span>
                  <span className="text-gray-600">{todo.description}</span>
                  <span className="text-xs text-gray-400">{todo.date}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setEditingId(todo.id)
                      setEditText({
                        title: todo.title || "",
                        description: todo.description || "",
                        date: todo.date || "",
                      })
                      setIsEditOpen(true)
                    }}
                  >
                    <Edit2Icon className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
