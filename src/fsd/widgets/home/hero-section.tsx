"use client"

export function HeroSection() {
  return (
    <section id="hero-section" className="welcome reletive" data-snap-section="true">
      <div className="h-100 mt-72 pb-72">
        <div className="align-items-center h-100 df">
          <div className="video-wrapper position-relative w-50 h-100">
            <video autoPlay muted loop playsInline className="background-video">
              <source src="/images/luminat.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
          <div className="d-flex column-dir aic jcsb h-100 w-50 px-32">
            <div className="d-flex column-dir gap-16 mt-120">
              <p>Свет</p>
              <p>
                Передовые решения, улучшающие <br />
                качество освещения при минимальном <br />
                воздействии на окружающую среду <br />
                мальчик без очков тупое фото удалить
              </p>
            </div>
            <div className="d-flex aie jcsb mb-72">
              <img src="/images/Vector.svg" alt="" />
              <div className="d-flex column-dir gap-24 text-end">
                <p>Жизнь</p>
                <p>
                  Бренд с уникальным дизайном, благодаря которому <br /> каждый может создать непередаваемую
                  атмосферу <br /> тепла в своем помещении
                </p>
              </div>
            </div>
          </div>
          <img src="/images/logo.svg" alt="" className="absolute df aic jcc w-100 px-32" />
        </div>
      </div>
    </section>
  )
}
