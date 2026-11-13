"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { POLICY_CONTENTS_LABEL } from "@/lib/constants/policies";
import type { IPolicyContentsProps } from "@/lib/types";

export function PolicyContents({ children }: IPolicyContentsProps) {
  const [expanded, setExpanded] = useState(false);
  const contentsId = useId();

  return (
    <nav
      className={
        "policy-contents-contents mb-1 border-t [border-top-style:solid] [border-bottom-style:solid] border-t-soft-stone border-b border-b-soft-stone [&&_>_h2]:text-[length:24px] [&&_>_h2]:font-medium [&&_button]:flex [&&_button]:w-full [&&_button]:min-h-14 [&&_button]:items-center [&&_button]:justify-between [&&_button]:gap-4 [&&_button]:text-left [&&_button]:cursor-pointer [&&_button_svg]:shrink-0 [&&_button_svg]:text-peploe-burgundy [&&[data-expanded=true]_button_svg]:rotate-180 [&&_ol]:grid [&&_ol]:pb-3 [&&_ol_a]:grid [&&_ol_a]:grid-cols-[24px_minmax(0,_1fr)] [&&_ol_a]:items-start [&&_ol_a]:gap-4 [&&_ol_a]:min-h-11 [&&_ol_a]:pt-2.5 [&&_ol_a]:pb-2.5 [&&_ol_a]:text-text-secondary [&&_ol_a]:text-[length:14px] xl:mt-0 xl:mr-0 xl:mb-0 xl:ml-0 xl:pt-6 xl:pr-10 xl:border-0 xl:border-none xl:border-current xl:border-r xl:[border-right-style:solid] xl:border-r-soft-stone xl:[&&_>_h2]:w-68 xl:[&&_>_h2]:pb-3 xl:[&&_>_h2]:border-b xl:[&&_>_h2]:[border-bottom-style:solid] xl:[&&_>_h2]:border-b-soft-stone xl:[&&_button]:hidden xl:[&&_ol]:mt-2.5 xl:[&&_ol]:pb-0 xl:[&&_ol_a]:pt-2 xl:[&&_ol_a]:pb-4 xl:[&&_ol_a]:text-[length:16px] [&&_>_h2]:leading-8 [&&_ol_a]:leading-6"
      }
      aria-label={POLICY_CONTENTS_LABEL}
      data-expanded={expanded}
    >
      <h2>
        <span className={"policy-contents-label hidden xl:block"}>
          {POLICY_CONTENTS_LABEL}
        </span>
        <Button
          variant="plain"
          type="button"
          aria-expanded={expanded}
          aria-controls={contentsId}
          onClick={() => setExpanded(!expanded)}
        >
          {POLICY_CONTENTS_LABEL}
          <ChevronDown size={20} aria-hidden="true" />
        </Button>
      </h2>
      <div
        id={contentsId}
        className={
          "policy-contents-links hidden [.policy-contents-contents[data-expanded=true]_&&]:block xl:block"
        }
      >
        {children}
      </div>
    </nav>
  );
}
