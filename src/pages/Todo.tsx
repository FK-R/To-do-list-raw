import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Trash2, Edit2Icon } from "lucide-react"
import { CustomModal } from "@/components/common/Modal"
import { ReusableFormInputs } from "@/components/common/ReusableFormInputs"
import { showErrorToast, showSuccessToast } from "@/utils/toast"

export default function Todo() {
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

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`

  // Define fields configurations for Todo
  const todoFields = [
    { name: "title", type: "text", placeholder: "Task title", required: true },
    { name: "description", type: "text", placeholder: "Task description" },
    { name: "date", type: "date", placeholder: "Task date" },
  ]

  async function getTodos() {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTodos(data.data || [])
    } catch (error) {
      console.error("Failed to fetch todos:", error)
      showErrorToast("Failed to fetch tasks")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((values) => ({ ...values, [name]: value }))
  }

  async function createTodo() {
    if (!input.title || !input.title.trim()) return
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      const newTodo = await response.json()
      if (newTodo.data) {
        setTodos([...todos, newTodo.data])
        setInput({ title: "", description: "", date: "" })
        setIsAddOpen(false)
        showSuccessToast("Task added successfully")
      }
    } catch (error) {
      console.error("Failed to create todo:", error)
      showErrorToast(error, "Failed to create task")
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditText((values) => ({ ...values, [name]: value }))
  }

  async function updateTodo(id) {
    if (!editText.title || !editText.title.trim()) return
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editText),
      })
      const updatedTodo = await response.json()

      if (updatedTodo.data) {
        setTodos(
          todos.map((todo) => (todo.id === id ? updatedTodo.data : todo))
        )
        setIsEditOpen(false)
        setEditingId(null)
        setEditText({ title: "", description: "", date: "" })
        showSuccessToast("Task updated successfully")
      }
    } catch (error) {
      console.error("Failed to update todo:", error)
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
      setTodos(todos.filter((todo) => todo.id !== id))
      showSuccessToast("Task deleted successfully")
    } catch (error) {
      console.error("Failed to delete todo:", error)
    }
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

        {/* Add Modal */}
        <CustomModal
          isOpen={isAddOpen}
          onOpenChange={setIsAddOpen}
          title="Add Task"
          submitText="Add"
          formId="todo-add-form"
        >
          <ReusableFormInputs
            formId="todo-add-form"
            fields={todoFields}
            formValues={input}
            onChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault()
              createTodo()
            }}
          />
        </CustomModal>

        {/* Edit Modal */}
        <CustomModal
          isOpen={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open)
            if (!open) setEditingId(null)
          }}
          title="Edit Task"
          submitText="Save Changes"
          formId="todo-edit-form"
        >
          <ReusableFormInputs
            formId="todo-edit-form"
            fields={todoFields}
            formValues={editText}
            onChange={handleEditChange}
            onSubmit={(e) => {
              e.preventDefault()
              updateTodo(editingId)
            }}
          />
        </CustomModal>

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
                    <Trash2 className="size-4" />
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
