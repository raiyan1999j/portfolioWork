import ContextProvider from "./contextprovider/contextprovider";
import "./globals.css";
import QueryProvider from "./queryprovider/queryprovider";

type Children = {
  children : React.ReactNode
}

export default function RootLayout({children}:Children){
  return(
    <>
    <html>
      <body cz-shortcut-listen="true">
        <QueryProvider>
        <ContextProvider>
        {children}
        </ContextProvider>
        </QueryProvider>
      </body>
    </html>
    </>
  )
}