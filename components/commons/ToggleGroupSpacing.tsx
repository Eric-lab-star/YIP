
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"

export function FormToggleGroup<T extends FieldValues>({
  name,
  control,
  label,
}: FormToggleGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}
          <ToggleGroup
            type="multiple"
            size="sm"
            variant="outline"
            spacing={2}
            value={field.value}
            onValueChange={field.onChange}
          >
            <ToggleGroupItem value="mon">월요일</ToggleGroupItem>
            <ToggleGroupItem value="tue">화요일</ToggleGroupItem>
            <ToggleGroupItem value="wed">수요일</ToggleGroupItem>
            <ToggleGroupItem value="thur">목요일</ToggleGroupItem>
            <ToggleGroupItem value="fri">금요일</ToggleGroupItem>
            <ToggleGroupItem value="sat">토요일</ToggleGroupItem>
            <ToggleGroupItem value="sun">일요일</ToggleGroupItem>
          </ToggleGroup>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}


interface FormToggleGroupProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
}

