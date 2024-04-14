import "@/styles/globals.css"
import Nav from "@/components/Nav.jsx"
export const metadata = {
  tilte: "Promptopia",
  description: "Discover & Share AI Prompts"
}

const layout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
        <Nav/>
          {children}
        </main>
      </body>
    </html>
  )
}

export default layout