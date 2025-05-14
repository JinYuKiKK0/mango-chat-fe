import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "checkbox" | "radio" | "switch";
  label?: string;
  className?: string;
  isGrouped?: boolean;
  labelClassName?: string;
};

const FormCheckRadio = (props: Props) => {
  const labelSpanClassName = `pl-2 ${props.labelClassName || ''}`;

  return (
      <label
          className={`${props.type} ${props.className || ''} ${props.isGrouped ? "mr-6 mb-3 last:mr-0" : ""}`}
      >
        {props.children}
        <span className="check" />
        <span className={labelSpanClassName}>{props.label}</span>
      </label>
  );
};

export default FormCheckRadio;