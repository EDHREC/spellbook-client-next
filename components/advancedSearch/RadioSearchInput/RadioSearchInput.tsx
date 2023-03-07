import { useState } from 'react'

type Props = {
  checkedValue: string
  options: Array<{value: string, label: string}>
  formName: string
  label: string
  onChange?: (value: string) => void
}

const RadioSearchInput = ({ checkedValue, options, formName, label, onChange }: Props) => {
  const [localValue, setLocalValue] = useState<string>(checkedValue)

  const handleChange = (value: string) => {
    setLocalValue(value)
    onChange && onChange(value)
  }

  return (
    <div>
      <label className="font-semibold">{label}</label>
      <fieldset className="flex flex-col">
        <legend className="sr-only" aria-hidden="true">
          Choose settings for {label}
        </legend>
        {options.map((option, index) => (
          <label key={`${label}-radio-input-${index}`} htmlFor={`${label}-radio-input-${index}`} className="radio-wrapper sm:inline-flex items-center mt-3">
            <input
              id={`${label}-radio-input-${index}`}
              type="radio"
              name={formName}
              className="h-5 w-5"
              checked={localValue === option.value}
              value={option.value}
              onChange={() => handleChange(option.value)}
              />
            <span className="ml-2 text-dark">{option.label}</span>
          </label>
          ))}
      </fieldset>
    </div>
  )
}


export default RadioSearchInput