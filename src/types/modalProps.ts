interface ModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  submitText?: string
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
}
