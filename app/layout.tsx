import "./globals.css";
import Script from "next/script";
import { Analytics } from "./components/analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9YECQHCMK4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9YECQHCMK4');
          `}
        </Script>
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
