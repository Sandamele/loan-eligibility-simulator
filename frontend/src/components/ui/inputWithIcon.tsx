import type { InputWithIconType } from "@/types/inputWithIconTypes";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { memo } from "react";

export const InputWithIcon = memo(
  ({ icon, alignIcon, ...inputProps }: InputWithIconType) => {
    return (
      <InputGroup>
        <InputGroupInput {...inputProps} />
        <InputGroupAddon align={alignIcon}>{icon}</InputGroupAddon>
      </InputGroup>
    );
  },
);
