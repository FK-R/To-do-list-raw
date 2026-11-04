import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Modal({
  isOpen,
  onOpenChange,
  title,
  formValues,
  onChange,
  onSubmit,
  submitText = "Save",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <Input
            type="text"
            name="title"
            value={formValues.title || ""}
            onChange={onChange}
            placeholder="Task title"
          />
          <Input
            type="text"
            name="description"
            value={formValues.description || ""}
            onChange={onChange}
            placeholder="Add description"
          />
          <Input
            type="date"
            name="date"
            value={formValues.date || ""}
            onChange={onChange}
            placeholder="Add date"
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="button" onClick={onSubmit}>
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
