import { About } from "./sections/About/About";
import { Contacts } from "./sections/Contacts/Contacts";
import { Features } from "./sections/Features/Features";
import { Footer } from "./sections/Footer/Footer";
import { Hero } from "./sections/Hero/Hero";
import { Portfolio } from "./sections/Portfolio/Portfolio";
import { Quiz } from "./sections/Quiz/Quiz";

export function App() {
  return (
    <>
      <Hero />
      <Features />
      <Portfolio />
      <About />
      <Quiz />
      <Contacts />
      <Footer />
    </>
  );
}
