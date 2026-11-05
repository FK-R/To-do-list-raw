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
  title, // Fixed: correctly maps from 'title' prop
  formValues,
  onChange,
  onSubmit,
  submitText = "Save",

  // Dynamic field configuration props with sensible defaults
  firstFieldName = "name",
  firstPlaceholder = "Name",
  secondFieldName = "description",
  secondPlaceholder = "Description",
  thirdFieldName = "price",
  thirdInType = "text",
  thirdPlaceholder = "Price",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          {/* First Field */}
          <Input
            type="text"
            name={firstFieldName}
            value={formValues[firstFieldName] || ""}
            onChange={onChange}
            placeholder={firstPlaceholder}
          />

          {/* Second Field */}
          <Input
            type="text"
            name={secondFieldName}
            value={formValues[secondFieldName] || ""}
            onChange={onChange}
            placeholder={secondPlaceholder}
          />

          {/* Third Field (Dynamic Type/Name) */}
          <Input
            type={thirdInType}
            name={thirdFieldName}
            value={formValues[thirdFieldName] || ""}
            onChange={onChange}
            placeholder={thirdPlaceholder}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={onSubmit}>
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
