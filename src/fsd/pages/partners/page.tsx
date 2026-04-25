"use client"

import { useState } from "react"
import { Header } from "@/widgets/layout/header"
import { Footer } from "@/widgets/layout/footer"
import { CartModal } from "@/widgets/cart/cart-modal"

const collageItems = [
  { id: "creative", label: "Creative", image: "/images/project-1.webp" },
  { id: "lite", label: "Lite", image: "/images/art-2.webp" },
  { id: "for", label: "For", image: "/images/project-2.webp" },
  { id: "your", label: "Your", image: "/images/project-3.webp" },
  { id: "perfect", label: "Perfect", image: "/images/team.png" },
  { id: "life", label: "Life", image: "/images/project-4.webp" },
]

const partnershipFormats = [
  "Спецусловия на коллекции и лимитированные серии",
  "Быстрый рендер, визуал и подбор сценариев света",
  "Возможность кастомизации под интерьер, бренд или объект",
  "Сопровождение на всех этапах: от идеи до установки",
]

export default function PartnersPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <main className="partners-page">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <section className="partners-hero" data-snap-section="true">
        <div className="container-32 partners-hero-grid">
          <div className="partners-hero-heading">
            <div className="heading h-gradient df gap-16">
              <h2>СВЕТ, КОТОРЫЙ ХОЧЕТСЯ</h2>
              <h2 className="italic">ПОКАЗАТЬ</h2>
            </div>
          </div>

          <div className="partners-collage">
            <p className="partners-lead">
              Мы строим не просто бизнес, а среду. Среду, в которой важны эстетика, честность, открытость и
              смысл.
            </p>

            {collageItems.map((item) => (
              <article key={item.id} className={`partners-collage-card partners-collage-card--${item.id}`}>
                <img src={item.image} alt={item.label} />
                <div className="caption text-green">{item.label}</div>
              </article>
            ))}

            <p className="partners-hero-note caption text-green">
              Если вам близок наш подход <br/> — давайте сотрудничать.
            </p>
          </div>

          <div className="partners-copy-block caption text-green">
            Мы смотрим на свет как на часть архитектурного высказывания. Поэтому партнерство для нас
            начинается с общего вкуса, а продолжается точной и спокойной реализацией.
          </div>
        </div>
      </section>

      <section className="partners-panel" data-snap-section="true">
        <div className="partners-panel-block partners-panel-block--light">
          <div className="container-32 partners-detail-grid">
            <div>
              <div className="heading h-gradient df gap-16">
                <h2>ФОРМАТЫ</h2>
                <h2 className="italic">ПАРТНЕРСТВА</h2>
              </div>

              <ul className="partners-format-list">
                {partnershipFormats.map((format) => (
                  <li key={format}>{format}</li>
                ))}
              </ul>
            </div>

            <div className="partners-subscribe-copy">
              <p className="gap-9">
                Мы понимаем, как важно, чтобы свет дополнял пространство, а не спорил с ним. Помогаем подобрать
                объекты и их комбинации для создания цельной визуальной композиции в вашем проекте.
              </p>
            </div>
          </div>
        </div>

        <div className="partners-panel-block partners-panel-block--dark">
          <div className="container-32 partners-subscribe-grid">
            <div className="partners-subscribe-copy">
              <div className="heading h-gradient-bwhite df column-dir gap-8">
                <h2>НАМ ПО ПУТИ С ТЕМИ,</h2>
                <h2 className="italic">КТО ЧУВСТВУЕТ</h2>
              </div>
              <form className="partners-form pt-16">
                <input type="email" name="email" placeholder="Email" aria-label="Email" />
                <button type="submit">Оформить подписку</button>
              </form>
            </div>

            <div className="partners-subscribe-copy">
              <p className="justify-start w-95">
                Мы открыты к совместной работе с архитекторами, дизайнерами, брендами и студиями.
              </p>
              <p className="justify-start w-95">
                Вместе можно
                создавать не просто объекты, а истории.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
