"use client"

import { Fragment, useState } from "react"
import { faqs } from "@/entities/faq/model/faqs"
import { cn } from "@/shared/lib/cn"

function renderMultilineText(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </Fragment>
  ))
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq-section" className="faq" data-snap-section="true">
      <div className="container-32 mt-72">
        <div className="heading h-gradient col-4 offset-3">
          <h2>FAQ</h2>
        </div>
        <div className="questions mt-48 df column-dir gap-16">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            const questionClassName = faq.id === "4" ? "q df pt-40 pb-16" : "q df py-16"

            return (
              <div key={faq.id} className="q-1">
                <div className={cn(questionClassName, isOpen && "active")} onClick={() => setOpenId(isOpen ? null : faq.id)}>
                  <div className="col-3 text-gray">
                    <h6>№0{index + 1}</h6>
                  </div>
                  <div className="col-8">
                    <h6 className="text-green">{renderMultilineText(faq.questionLines)}</h6>
                  </div>
                  <div className="col-1 df jce">
                    <button type="button" className="toggle-faq border-0 bg-transparent p-0">
                      <img src="/images/close.svg" alt="Toggle answer" />
                    </button>
                  </div>
                </div>
                <div
                  className="answer col-8 offset-3 py-16 text-green"
                  style={{
                    maxHeight: isOpen ? "300px" : "0",
                    paddingTop: isOpen ? "1rem" : "0",
                    paddingBottom: isOpen ? "1rem" : "0",
                  }}
                >
                  <p>{renderMultilineText(faq.answerLines)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
