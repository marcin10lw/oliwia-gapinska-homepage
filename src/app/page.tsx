import { Footer } from '@/components/Footer';
import { Categories, Hero } from './_components';
import { ContactSection } from '@/components/ContactSection';

export default async function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <ContactSection />
      <Footer />
    </main>
  );
}
