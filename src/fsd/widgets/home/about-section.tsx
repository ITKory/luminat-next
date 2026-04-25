export function AboutSection() {
  return (
    <section id="about-section" className="about" data-snap-section="true">
      <div className="container-fluid mt-72 df grid-12">
        <div className="col-6 d-flex gap-32">
          <div className="w-100 text-greyge df column-dir jcsb">
            <p>
              Мы создаём предметы, <br /> которые говорят.
            </p>
            <img className="star" src="/images/star icon.svg" alt="" />
          </div>
          <div className="w-100 text-greyge df column-dir gap-16">
            <img className="img-fluid" src="/images/team.png" alt="" />
            <div className="caption">Привет, мы LUMINAT</div>
          </div>
          <div className="w-100 text-greyge">
            <img src="/images/object instalation.png" alt="" />
          </div>
        </div>
        <div className="col-6 h-gradient df column-dir jcsb">
          <div className="df column-dir pb-32">
            <h4>Это не просто светильники.</h4>
            <h4 className="italic">Это форма мысли,</h4>
            <h4>отражённая в свете.</h4>
          </div>
          <div className="text-green">
            <p className="pb-32">
              Мы работаем на пересечении дизайна, искусства <br /> и инженерии — чтобы дать вам возможность
              выразить <br /> себя в пространстве.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
