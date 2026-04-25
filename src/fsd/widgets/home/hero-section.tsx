"use client"

export function HeroSection() {
  return (
      <section id="hero-section" className="welcome relative" data-snap-section="true">
        <div className="h-100 relative ">
          <div className="df h-100 align-items-center">
            {/* Левая половина — видео */}
            <div className="video-wrapper position-relative w-50 h-100">
              <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="background-video w-full h-full object-cover"
              >
                <source src="/images/luminat.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>

            {/* Правая половина — только тексты (Свет не трогаем) */}
            <div className="d-flex column-dir h-100 w-50 px-32">
              {/* Абзац «Свет» — оставлен точно как был */}
              <div className="d-flex column-dir gap-16 mt-146">
                <p>Свет</p>
                <p>
                  Передовые решения, улучшающие <br />
                  качество освещения при минимальном <br />
                  воздействии на окружающую среду <br />
                  и подчеркивающие характер пространства
                </p>
              </div>

              {/* Пустое пространство для выталкивания нижнего блока вниз */}
              <div className="flex-1"></div>

              {/* Абзац «Жизнь» — теперь строго снизу */}
              <div className="d-flex aie jcsb mb-146">
                <img src="/images/Vector.svg" alt="" className="flex-shrink-0" />
                <div className="d-flex column-dir gap-24 text-end">
                  <p>Жизнь</p>
                  <p className="max-w-xl">
                    Бренд с уникальным дизайном, благодаря которому <br />
                    каждый может создать непередаваемую атмосферу <br />
                    тепла в своем помещении
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Лого — точно по центру всей секции */}

          <img
              src="/images/logo-dark.svg"
              alt="LUMINAT"
              className="absolute w-50  top-1/3 right-1 z-20 p-20"
          />
        </div>
      </section>
  )
}
