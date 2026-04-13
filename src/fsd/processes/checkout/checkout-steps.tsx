import Link from "next/link"

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
    <div className="df">
      {steps.map(({ step, label, href }) => (
        <div key={step} className={step === currentStep ? "border-bottom-green df aic jcc w-100" : "border-bottom df aic jcc w-100"}>
          <Link href={href} className={step === currentStep ? "btn-link-green-sec" : "btn-link-gray-sec"}>
            {label}
          </Link>
        </div>
      ))}
    </div>
  )
}
