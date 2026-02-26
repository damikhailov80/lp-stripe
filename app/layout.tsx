import "./globals.css";
import { Analytics } from "./components/analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
