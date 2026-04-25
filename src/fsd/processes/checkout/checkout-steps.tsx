import Link from "next/link"
import { cn } from "@/shared/lib/cn"

interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { step: 1, label: "01 Личные данные", href: "/checkout/personal-info" },
  { step: 2, label: "02 Способы получения", href: "/checkout/delivery" },
  { step: 3, label: "03 Оплата", href: "/checkout/payment" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {steps.map(({ step, label, href }) => {
        const isCurrent = step === currentStep
        const isComplete = step < currentStep

        return (
          <Link
            key={step}
            href={href}
            className={cn(
              "inline-flex min-h-12 items-center justify-center border px-4 py-3 text-center text-sm transition md:text-base",
              isCurrent
                ? "border-green bg-[rgba(81,88,98,0.06)] text-green"
                : isComplete
                  ? "border-[rgba(81,88,98,0.2)] text-green"
                  : "border-[rgba(81,88,98,0.14)] text-bw-7 hover:text-green"
            )}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
