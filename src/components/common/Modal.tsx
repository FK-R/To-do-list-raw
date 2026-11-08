import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CustomModal({
  isOpen,
  onOpenChange,
  title,
  submitText = "Save",
  formId,
  children,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">{children}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          {formId ? (
            <Button type="submit" form={formId}>
              {submitText}
            </Button>
          ) : (
            <Button type="button">{submitText}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
