const steps = [
  {
    number: "#01",
    title: (
      <>
        Исследуем пространство <br /> и задачу
      </>
    ),
    description: (
      <>
        Понимаем, что нужно именно этому месту. <br />
        Мы анализируем архитектурные особенности, функции и настроение пространства, чтобы свет не просто
        освещал — а работал с ним в унисон.
      </>
    ),
    className: "w-100 df column-dir jcsb p-32 text-green",
  },
  {
    number: "#02",
    title: <>Формулируем образ света — как он должен «звучать»</>,
    description: (
      <>
        Свет — это голос пространства. <br />
        На этом этапе мы определяем характер будущего света: мягкий или акцентный, динамичный или
        обволакивающий. Подбираем его логику, ритм, направленность.
      </>
    ),
    className: "w-100 df column-dir jcsb reletive bg-image-block p-32",
  },
  {
    number: "#03",
    title: <>Создаём концепт — визуально, технически, эмоционально</>,
    description: (
      <>
        Соединяем форму, смысл и функцию. <br />
        Проектируем систему освещения с учётом технических требований и эмоционального воздействия. Создаём
        эскизы, подбираем решения, закладываем смысл.
      </>
    ),
    className: "w-100 df column-dir jcsb p-32 text-green",
  },
  {
    number: "#04",
    title: (
      <>
        Сопровождаем монтаж <br /> и настройку
      </>
    ),
    description: (
      <>
        Финальная сцена — безупречный свет. <br />
        Контролируем установку, проверяем работу всех источников, настраиваем сценарии освещения. Добиваемся
        идеального света, который работает и как функция, и как атмосфера.
      </>
    ),
    className: "w-100 df column-dir jcsb p-32 text-green",
  },
]

export function ProcessSection() {
  return (
    <section id="process-section" className="idea" data-snap-section="true">
      <div className="df column-dir mt-72">
        <div className="heading h-gradient gap-16 df col-6 jce">
          <h2>ОТ ИДЕИ</h2>
          <h2 className="italic">ДО СВЕТА</h2>
        </div>
        <div className="df items mt-48">
          <div className="col-6 df">
            {steps.slice(0, 2).map((step) => (
              <div key={step.number} className={step.className}>
                <p>{step.number}</p>
                <div className="desc df column-dir gap-24">
                  <h6>{step.title}</h6>
                  <div className="capton">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-6 df">
            {steps.slice(2).map((step) => (
              <div key={step.number} className={step.className}>
                <p>{step.number}</p>
                <div className="desc df column-dir gap-24">
                  <h6>{step.title}</h6>
                  <div className="capton">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
