"use client"

import Image from "next/image"
import { useState } from "react"
import {
  filterOptions,
  getProductPreviews,
  rawProductNames,
  softModernProductNames,
} from "@/entities/product/model/products"
import { Header } from "@/widgets/layout/header"
import { CartModal } from "@/widgets/cart/cart-modal"

const rawProducts = getProductPreviews(rawProductNames)
const softModernProducts = getProductPreviews(softModernProductNames)

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU").replace(/\u00A0/g, " ")}₽`
}

function ProductCard({ name, price, image }: { name: string; price: number; image: string }) {
  return (
    <div className="product-item df column-dir gap-12">
      <div className="product-image-wrapper relative df jce aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <a href="#" className="like-btn absolute top-0 right-0 mt-12 mr-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 10.2589C13.3333 3.99967 4 4.66634 4 12.6664C4 20.6664 16 27.3333 16 27.3333C16 27.3333 28 20.6664 28 12.6664C28 4.66634 18.6667 3.99967 16 10.2589Z"
              stroke="#FFFEF7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <div className="df jcsb">
        <h6 className="text-green">{name}</h6>
        <h6 className="text-green text-end">{formatPrice(price)}</h6>
      </div>
      <div className="to-cart text-end">
        <a href="#" className="btn-link-green-sec">
          В корзину→
        </a>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  return (
    <main className="bg-bwhite">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <section className={isFilterOpen ? "filter mt-72 border-bottom active" : "filter mt-72 border-bottom"}>
        <div className="container-32 df column-dir gap-48 pb-16 pt-8">
          <div className="filter-header df jcsb text-green aic" onClick={() => setIsFilterOpen((value) => !value)}>
            <h6>Выбрать фильтр</h6>
            <button type="button" className="filter-toggle border-0 bg-transparent p-0">
              <img src="/images/close.svg" alt="Фильтры" />
            </button>
          </div>

          <div className="filter-dropdown container-32">
            <div className="df gap-32 pb-32 border-bottom">
              <div className="col-6 df gap-32">
                <div className="w-100 df column-dir gap-16">
                  <p>Категории товаров</p>
                  <div className="df column-dir">
                    {filterOptions.categories.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                  <a href="" className="btn-green-sec">Применить</a>
                </div>
                <div className="w-100 df column-dir gap-16">
                  <p>Тип</p>
                  <div className="df column-dir">
                    {filterOptions.types.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                </div>
                <div className="w-100 df column-dir gap-16">
                  <p>Стиль</p>
                  <div className="df column-dir">
                    {filterOptions.styles.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-6 df gap-32">
                <div className="w-100 df column-dir gap-16">
                  <p>Пространство</p>
                  <div className="df column-dir">
                    {filterOptions.spaces.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                </div>
                <div className="w-100 df column-dir gap-16">
                  <p>Материал</p>
                  <div className="df column-dir">
                    {filterOptions.materials.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                </div>
                <div className="w-100 df column-dir gap-16">
                  <p>Температура</p>
                  <div className="df column-dir">
                    {filterOptions.temperatures.map((item) => (
                      <a key={item} href="" className="btn-link-gray-sec">{item}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sort">
        <div className="sort-item container-32 mt-16">
          <div className="dropdown">
            <button
              type="button"
              className="sort-trigger df gap-8 text-green p-0"
              onClick={() => setIsSortOpen((value) => !value)}
            >
              <h6 className="text-green">Сортировка</h6>
              <img src="/images/Arrow/Chevron_Down.svg" alt="" />
            </button>
            {isSortOpen && (
              <ul className="dropdown-menu">
                <li><button type="button" className="dropdown-item active">По популярности</button></li>
                <li><button type="button" className="dropdown-item">По новизне</button></li>
                <li><button type="button" className="dropdown-item">По цене</button></li>
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container-32 df mt-64">
          <div className="catalog-grid">
            <div className="filters df column-dir gap-32">
              <div className="price df column-dir gap-24">
                <h6 className="text-green">Цена</h6>
                <div className="df column-dir gap-16">
                  <div className="df jcsb aic">
                    <div className="ellipce bg-green" />
                    <div className="ractangle bg-green w-100" />
                    <div className="ellipce bg-green" />
                  </div>
                  <div className="min-max df gap-8">
                    <div className="min price-item df aib w-100 jcc pt-8">
                      <div className="caption text-bw-7">от</div>
                      <p className="text-green">1024</p>
                    </div>
                    <div className="max price-item df aib w-100 jcc pt-8">
                      <div className="caption text-bw-7">до</div>
                      <p className="text-green">1568000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="square df column-dir gap-24">
                <h6 className="text-green">Площадь</h6>
                <div className="var df column-dir gap-16">
                  {["1-5 кв.м.", "3-8 кв.м.", "5-10 кв.м.", "8-12 кв.м.", "10-15 кв.м."].map((item) => (
                    <div key={item} className="df aic gap-8">
                      <input className="form-check-input mt-0" type="checkbox" />
                      <p className="text-bw-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lamp-base df column-dir gap-24">
                <h6 className="text-green">Тип цоколя</h6>
                <div className="var df column-dir gap-16">
                  {["COB", "E14", "E27", "G9", "GU10"].map((item) => (
                    <div key={item} className="df aic gap-8">
                      <input className="form-check-input mt-0" type="checkbox" />
                      <p className="text-bw-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="color df column-dir gap-24">
                <h6 className="text-green">Цвет</h6>
                <div className="var df column-dir gap-16">
                  {[
                    { label: "Желтый", color: "bg-warning" },
                    { label: "Синий", color: "bg-primary" },
                    { label: "Зеленый", color: "bg-success" },
                    { label: "Белый", color: "bg-white border border-dark" },
                    { label: "Голубой", color: "bg-info" },
                  ].map((item) => (
                    <div key={item.label} className="df aic gap-8">
                      <input className="form-check-input mt-0" type="checkbox" />
                      <div className={`ellipce ${item.color}`} />
                      <p className="text-bw-7">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="collections df column-dir gap-48">
              <div className="products-grid raw">
                <div className="card-colection df column-dir jcsb">
                  <div className="heading df column-dir gap-16">
                    <h6 className="text-green">RAW</h6>
                    <div className="btn-link-green-sec">Перейти в коллекцию →</div>
                  </div>
                  <div className="about df column-dir gap-8">
                    <div className="caption text-green">Честный свет с грубым акцентом.</div>
                    <div className="caption text-green">
                      Тактильные материалы, минимальная обработка, максимальное присутствие.
                    </div>
                  </div>
                </div>
                {rawProducts.map((product) => (
                  <ProductCard key={product.name} {...product} />
                ))}
              </div>

              <div className="products-grid soft-modern">
                <div className="card-colection df column-dir jcsb">
                  <div className="heading df column-dir gap-16">
                    <h6 className="text-green">SOFT MODERN</h6>
                    <div className="btn-link-green-sec">Перейти в коллекцию →</div>
                  </div>
                  <div className="about df column-dir gap-8">
                    <div className="caption text-green">Тишина формы. Тепло света.</div>
                    <div className="caption text-green">
                      Мягкий свет, округлые линии и спокойная пластика <br />
                      для камерных пространств.
                    </div>
                  </div>
                </div>
                {softModernProducts.map((product) => (
                  <ProductCard key={product.name} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
