import "./globals.css";

type Children = {
  children : React.ReactNode
}

export default function RootLayout({children}:Children){
  return(
    <>
    <html>
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
    </>
  )
}