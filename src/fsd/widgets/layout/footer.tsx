import Image from "next/image"
import Link from "next/link"
import { cn } from "@/shared/lib/cn"

interface FooterProps {
  variant?: "dark" | "light"
}

export function Footer({ variant = "dark" }: Readonly<FooterProps>) {
  const isDark = variant === "dark"
  const textClass = isDark ? "text-bwhite" : "text-green"
  const bgClass = isDark ? "bg-green" : "bg-bwhite"
  const arrowSrc = isDark ? "/images/Arrow/Arrow_Up_Right_SM.svg" : "/images/Arrow_Up_Right_SM_green.svg"
  const logoSrc = isDark ? "/images/logo-light.svg" : "/images/logo-dark.svg"
  const navLinkClass = isDark ? "btn-link-bwhite-sec" : "btn-link-green-sec"
  const socialSuffix = isDark ? "" : "_green"

  return (
    <footer className={cn( bgClass, isDark ? "site-footer--dark" : "site-footer--light")}>
      <div className="site-footer__inner df column-dir py-64 container-32 gap-48 relative">
        <div className="site-footer__signup col-4 df column-dir gap-24">
          <h6 className={textClass}>Подписаться</h6>
          <form className="df column-dir email-subscription">
            <div className={cn("df", textClass)}>
              <label htmlFor="footer-email" className="caption">
                Введите ваш E-mail
              </label>
              <button type="submit" className="arrow-button" aria-label="Отправить email">
                <Image src={arrowSrc} alt="" className="arrow" width={24} height={24} />
              </button>
            </div>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              className={cn(
                "input-wrapper",
                isDark ? "bg-green text-bwhite" : "bg-bwhite text-green border-bottom"
              )}
              placeholder=""
            />
          </form>
        </div>

        <div className="site-footer__logo logo df column-dir">
          <div className="w-100">
            <Image src={logoSrc} alt="LUMINAT" width={1600} height={220} className="w-100" />
          </div>
        </div>

        <div className={cn("site-footer__tagline df gap-32 w-100", textClass)}>
          <div className="col-6">
            <h6>STUDIO</h6>
          </div>
          <div className="justify-content-center">
            <h6>OF</h6>
          </div>
          <div className="w-100 d-flex justify-content-end">
            <h6 className="text-end">LIGHT</h6>
          </div>
        </div>

        <div className="site-footer__separator separate w-100 bg-gray" />

        <div className="site-footer__main df gap-32">
          <div className="site-footer__contacts col-6 df column-dir gap-24">
            <div className="df column-dir gap-8">
              <div className="caption text-gray">E-mail</div>
              <p className={textClass}>info@luminat.com</p>
            </div>
            <div className="df column-dir gap-8">
              <div className="caption text-gray">Адрес</div>
              <p className={textClass}>
                60300 Большая Покровская улица, 3, <br /> Нижний Новгород
              </p>
            </div>
            <div className="df column-dir w-100 gap-8">
              <div className="caption text-gray">Телефон</div>
              <p className={textClass}>+7 987 654 32 10</p>
            </div>
          </div>

          <div className="site-footer__nav justify-content-end df column-dir">
            <Link href="/" className={navLinkClass}>Главная</Link>
            <Link href="/catalog" className={navLinkClass}>Каталог</Link>
            <Link href="/about" className={navLinkClass}>О студии</Link>
            <Link href="/partners" className={navLinkClass}>Партнерам</Link>
            <Link href="/privacy" className={navLinkClass}>Политика конфиденциальности</Link>
            <Link href="/terms" className={navLinkClass}>Обработка персональных данных</Link>
          </div>

          <div className="site-footer__social w-100 df column-dir gap-12 jce aie">
            <a href=""><Image src={`/images/Pinterest Fill${socialSuffix}.svg`} alt="Pinterest" width={32} height={32} /></a>
            <a href=""><Image src={`/images/Tiktok Fill${socialSuffix}.svg`} alt="TikTok" width={32} height={32} /></a>
            <a href=""><Image src={`/images/Telegram Fill${socialSuffix}.svg`} alt="Telegram" width={32} height={32} /></a>
            <a href=""><Image src={`/images/Whatsapp Fill${socialSuffix}.svg`} alt="WhatsApp" width={32} height={32} /></a>
            <a href=""><Image src={`/images/VK Fill${socialSuffix}.svg`} alt="VK" width={32} height={32} /></a>
          </div>
        </div>

        <div className="site-footer__separator separate w-100 bg-gray" />
      </div>
    </footer>
  )
}
