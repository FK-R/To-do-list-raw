import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import Modal from "../components/Modal"
import { Trash2, Edit2Icon } from "lucide-react" // Fixed DeleteIcon to standard Lucide name if needed

export default function Product() {
  const [products, setProducts] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
  })

  // Edit Product Modal State
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState({
    name: "",
    description: "",
    price: "",
  })

  const API_URL = "http://192.168.68.106:5000/products"

  async function getProducts() {
    try {
      const response = await fetch(`${API_URL}/get-products`)
      const data = await response.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((values) => ({ ...values, [name]: value }))
  }

  async function addProducts() {
    if (!input.name || !input.name.trim()) return
    try {
      const response = await fetch(`${API_URL}/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          price: parseFloat(input.price) || 0,
        }),
      })

      const newProduct = await response.json()
      if (newProduct.success) {
        setProducts([...products, newProduct.data])
        setInput({ name: "", description: "", price: "" })
        setIsAddOpen(false)
      }
    } catch (error) {
      console.error("Failed to add product:", error)
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditText((values) => ({ ...values, [name]: value }))
  }

  async function updateProduct(id) {
    if (!editText.name || !editText.name.trim()) return
    try {
      // Matching your backend update endpoint route structure
      const response = await fetch(`${API_URL}/update-product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editText,
          price: parseFloat(editText.price) || 0,
        }),
      })
      const updatedData = await response.json()

      if (updatedData.success) {
        setProducts(
          products.map((product) =>
            product.id === id ? updatedData.data : product
          )
        )
        setIsEditOpen(false)
        setEditingId(null)
        setEditText({ name: "", description: "", price: "" })
      }
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  async function deleteProduct(id) {
    try {
      await fetch(`${API_URL}/delete-product/${id}`, {
        method: "DELETE",
      })
      setProducts(products.filter((product) => product.id !== id))
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-4 text-center text-xl font-bold">Product App</h2>

        <div className="mb-6 flex justify-center">
          <Button variant="outline" onClick={() => setIsAddOpen(true)}>
            Add Product
          </Button>
        </div>

        <Modal
          isOpen={isAddOpen}
          onOpenChange={setIsAddOpen}
          title="Add Product"
          formValues={input}
          onChange={handleChange}
          onSubmit={addProducts}
          submitText="Add"
          firstFieldName="name"
          firstPlaceholder="Product name"
          secondFieldName="description"
          secondPlaceholder="Product description"
          thirdFieldName="price"
          thirdInType="number"
          thirdPlaceholder="Product price"
        />

        <Modal
          isOpen={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open)
            if (!open) setEditingId(null)
          }}
          title="Edit Product"
          formValues={editText}
          onChange={handleEditChange}
          onSubmit={() => updateProduct(editingId)}
          submitText="Save"
          firstFieldName="name"
          firstPlaceholder="Product name"
          secondFieldName="description"
          secondPlaceholder="Product description"
          thirdFieldName="price"
          thirdInType="number"
          thirdPlaceholder="Product price"
        />
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border-b pb-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-sm">
                  <span className="text-base font-semibold">
                    {product.name}
                  </span>
                  <span className="text-gray-600">{product.description}</span>
                  <span className="text-xs text-gray-400">
                    ${product.price}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setEditingId(product.id)
                      setEditText({
                        name: product.name || "",
                        description: product.description || "",
                        price: product.price || "",
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
                    onClick={() => deleteProduct(product.id)}
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
