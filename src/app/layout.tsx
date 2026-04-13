import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../fsd/shared/styles/fonts.css'
import '../fsd/shared/styles/spacing.css'

export const metadata: Metadata = {
  title: 'LUMINAT - Авторские светильники',
  description: 'Мы создаём световые объекты, которые меняют архитектуру не по форме, а по ощущению. Авторские коллекции света для жилых и публичных пространств.',
  generator: 'v0.app',
  keywords: ['светильники', 'дизайнерский свет', 'LUMINAT', 'авторские светильники', 'инсталляции'],
}

export const viewport: Viewport = {
  themeColor: '#40423D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="bg-[#FFFEF7] text-[#40423D]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
