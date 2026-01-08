'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id)
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between py-6 text-left group"
            >
              <span className="text-lg md:text-xl font-medium text-white pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center transition-all group-hover:border-white/60">
                {isOpen ? (
                  <Minus className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-6 pr-12">
                <p className="text-white/80 text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="border-t border-white/10"></div>
            )}
          </div>
        )
      })}
    </div>
  )
}

