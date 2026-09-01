import { About } from "./sections/About/About";
import { Contacts } from "./sections/Contacts/Contacts";
import { Features } from "./sections/Features/Features";
import { Hero } from "./sections/Hero/Hero";
import { Quiz } from "./sections/Quiz/Quiz";

export function App() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Quiz />
      <Contacts />
    </>
  );
}
