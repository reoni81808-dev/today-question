"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        // 라이트모드: 체크됨=검정, 체크안됨=회색
        "data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-400",
        // 다크모드: 체크됨=흰색, 체크안됨=어두운 회색
        "dark:data-[state=checked]:bg-white dark:data-[state=unchecked]:bg-gray-600",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          // 라이트모드: 핸들은 항상 흰색
          "bg-white",
          // 다크모드: 핸들은 항상 검정색
          "dark:bg-black",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };