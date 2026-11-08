import { toast } from "@/components/ui/toast"

export const showSuccessToast = (title: string, description?: string) => {
  return toast.add({
    title,
    description,
  })
}

export const showErrorToast = (title: string, description?: string) => {
  return toast.add({
    title: title || "An error occurred",
    description,
  })
}
