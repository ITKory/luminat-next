export function ContactSection() {
  return (
    <section id="contact-section" className="contact" data-snap-section="true">
      <div className="df container-32 mt-72 mb-32">
        <div className="col-6 df column-dir jcsb">
          <div className="df column-dir gap-48">
            <div className="heading df gap-8 h-gradient">
              <h2>НАШИ</h2>
              <h2 className="italic">КОНТАКТЫ</h2>
            </div>
            <h6>Свет начинается с диалога</h6>
          </div>
          <div className="df contact-links">
            <a href="https://t.me" target="_blank" rel="noreferrer" className="contact-link w-20">
              Telegram →
            </a>
            <a href="https://wa.me" target="_blank" rel="noreferrer" className="contact-link w-30">
              WhatsApp →
            </a>
            <a href="https://vk.com" target="_blank" rel="noreferrer" className="contact-link w-30">
              VK →
            </a>
          </div>
        </div>
        <div className="col-6 df column-dir gap-32">
          <div className="df">
            <div className="w-100 df column-dir gap-32">
              <div className="df column-dir gap-12">
                <div className="caption text-gray">E-mail</div>
                <p className="text-green">info@luminat.com</p>
              </div>
              <div className="df column-dir gap-12">
                <div className="caption text-gray">Адрес</div>
                <p className="text-green">60300 Большая Покровская улица, 3, Нижний Новгород</p>
              </div>
            </div>
            <div className="df column-dir w-100 gap-12">
              <div className="caption text-gray">Телефон</div>
              <p className="text-green">+7 987 654 32 10</p>
            </div>
          </div>
          <div id="map" className="w-100 map" />
        </div>
      </div>
    </section>
  )
}
