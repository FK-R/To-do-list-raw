import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Trash2, Edit2Icon } from "lucide-react"
import { showErrorToast, showSuccessToast } from "@/utils/toast"
import { CustomModal } from "@/components/common/Modal"
import { ReusableFormInputs } from "@/components/common/ReusableFormInputs"
import * as z from "zod"

export default function Product() {
  const Player = z.object({
    username: z.string(),
    xp: z.number(),
  })
  const [products, setProducts] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
  })

  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState({
    name: "",
    description: "",
    price: "",
  })

  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/products`

  const productFields = [
    { name: "name", type: "text", placeholder: "Product name", required: true },
    { name: "description", type: "text", placeholder: "Product description" },
    {
      name: "price",
      type: "number",
      placeholder: "Product price",
      step: "any",
    },
  ]

  async function getProducts() {
    try {
      const response = await fetch(`${apiUrl}/get-products`)
      const data = await response.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
      showErrorToast("Failed to fetch products")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((values) => ({ ...values, [name]: value }))
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditText((values) => ({ ...values, [name]: value }))
  }

  async function addProducts() {
    if (!input.name || !input.name.trim()) return
    try {
      const response = await fetch(`${apiUrl}/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          price: parseFloat(String(input.price)) || 0,
        }),
      })

      const newProduct = await response.json()
      if (newProduct.success) {
        setProducts([...products, newProduct.data])
        setInput({ name: "", description: "", price: "" })
        setIsAddOpen(false)
        showSuccessToast("Product added successfully")
      }
    } catch (error) {
      console.error("Failed to add product:", error)
      showErrorToast(error.message || "Failed to add product")
    }
  }

  async function updateProduct(id) {
    if (!id || !editText.name || !editText.name.trim()) return
    try {
      const response = await fetch(`${apiUrl}/update-product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editText,
          price: parseFloat(String(editText.price)) || 0,
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
        showSuccessToast("Product updated successfully")
      }
    } catch (error) {
      console.error("Failed to update product:", error)
      showErrorToast("Failed to update product")
    }
  }

  async function deleteProduct(id) {
    try {
      await fetch(`${apiUrl}/delete-product/${id}`, {
        method: "DELETE",
      })
      setProducts(products.filter((product) => product.id !== id))
      showSuccessToast("Product deleted successfully")
    } catch (error) {
      console.error("Failed to delete product:", error)
      showErrorToast("Failed to delete product")
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

        {/* Add Modal */}
        <CustomModal
          isOpen={isAddOpen}
          onOpenChange={setIsAddOpen}
          title="Create New Product"
          submitText="Add"
          formId="product-add-form"
        >
          <ReusableFormInputs
            formId="product-add-form"
            fields={productFields}
            formValues={input}
            onChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault()
              addProducts()
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
          title="Edit Product"
          submitText="Save Changes"
          formId="product-edit-form"
        >
          <ReusableFormInputs
            formId="product-edit-form"
            fields={productFields}
            formValues={editText}
            onChange={handleEditChange}
            onSubmit={(e) => {
              e.preventDefault()
              updateProduct(editingId)
            }}
          />
        </CustomModal>

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
                        price: String(product.price || ""),
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
