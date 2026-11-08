import { Input } from "@/components/ui/input"

export const ReusableFormInputs = ({
  formId,
  fields,
  formValues,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} id={formId} className="flex flex-col gap-3">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label htmlFor={field.labelFor}>{field.label}</label>

          <Input
            id={field.labelFor}
            type={field.type || "text"}
            name={field.name}
            value={formValues[field.name] ?? ""}
            onChange={onChange}
            placeholder={field.placeholder}
            required={field.required}
            step={field.step}
            aria-invalid={!!field.errorMessage}
            className={
              field.errorMessage
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />

          {field.errorMessage && (
            <p className="text-sm text-destructive">{field.errorMessage}</p>
          )}
        </div>
      ))}
    </form>
  )
}
