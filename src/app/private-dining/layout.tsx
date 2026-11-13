import { dmSans, ebGaramond } from "@/lib/fonts";
import type { IPrivateDiningLayoutProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PrivateDiningLayout({
  children,
}: IPrivateDiningLayoutProps) {
  return (
    <main
      className={cn(
        dmSans.className,
        ebGaramond.variable,
        "pd-page [--events-pale:#f1e9e3] [--events-content-width:min(_calc(100vw_-_48px),_var(--site-content-max-width)_)] [--events-content-edge:calc((100vw_-_var(--events-content-width))_/_2)] [--events-outer-gutter:max(_72px,_calc((100vw_-_var(--site-content-max-width))_/_2)_)] bg-warm-cream bg-none text-ink xl:[--events-content-width:min(_calc(100vw_-_144px),_var(--site-content-max-width)_)]",
      )}
    >
      {children}
    </main>
  );
}
