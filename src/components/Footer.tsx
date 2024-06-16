import Link from 'next/link';
import { Container } from './Container';
import { Logo } from './Logo';
import { PaddingWrapper } from './PaddingWrapper';

export const Footer = () => {
  return (
    <PaddingWrapper as="footer" className="border-t border-muted">
      <Container className="flex items-center justify-between">
        <Logo />
        <Link
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fchrupex_keczupex%3Figsh%3DNXQ5NjJlZzFkaWFp%26fbclid%3DIwZXh0bgNhZW0CMTAAAR0DuZeHN-cM65A6Y6avjH2zoguN2dI1ovteaESIZhpUKvJ0JSOuHQH11N4_aem_ZmFrZWR1bW15MTZieXRlcw&h=AT2u5S2ZV35Jtj8B3IF0gUJ5DV6ba9ZI3g8EP4GJVmFYcjSLMHgV5A2r1Mif09WP1MLh3Bd31XmdsISxjNC-SfuzU0rHXbmJ1wwZfAymQiuUel9Qh1twuJA7IsQG2GT-kUavCg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          INSTAGRAM
        </Link>
      </Container>
    </PaddingWrapper>
  );
};
