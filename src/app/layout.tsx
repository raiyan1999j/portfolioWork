import ContextProvider from "./contextprovider/contextprovider";
import "./globals.css";

type Children = {
  children : React.ReactNode
}

export default function RootLayout({children}:Children){
  return(
    <>
    <html>
      <body cz-shortcut-listen="true">
        <ContextProvider>
        {children}
        </ContextProvider>
      </body>
    </html>
    </>
  )
}