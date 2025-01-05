import { FocusEvent, InputHTMLAttributes, useState } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  withLabel?: string;
  validation?: (value: string) => { result: boolean; message: string | null };
  onValidationResult?: (result: boolean) => void;
}

const BaseInput = (props: BaseInputProps) => {
  const {
    withLabel,
    isRequired = true,
    validation,
    onValidationResult,
    ...rest
  } = props;
  const [error, setError] = useState<string | null>();
  const handleBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    if (!validation) return;
    const { result, message } = validation(e.target.value);
    setError(result ? null : message);
    onValidationResult?.(result);
  };
  return (
    <div>
      <div className="flex flex-col gap-y-2">
        {withLabel && (
          <label htmlFor={rest.id} className="text-sm">
            {withLabel}
            {isRequired && <span className="text-violet-800">*</span>}
          </label>
        )}
        <input
          {...rest}
          onBlur={handleBlurInput}
          className="w-full p-2 text-sm border border-[#DFDFDF] rounded-lg outline-none"
        />
      </div>
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default BaseInput;
