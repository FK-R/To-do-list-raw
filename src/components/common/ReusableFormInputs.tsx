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
        <Input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          value={formValues[field.name] || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          step={field.step}
        />
      ))}
    </form>
  )
}
