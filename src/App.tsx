import CodeToUI from './components/CodeToUI'
import CommandPalette from './components/CommandPalette'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Playground from './components/Playground'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Toaster from './components/Toaster'
import { MotionProvider } from './lib/motion'

export default function App() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <CodeToUI />
        <Experience />
        <Playground />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Cursor />
      <Toaster />
    </MotionProvider>
  )
}
