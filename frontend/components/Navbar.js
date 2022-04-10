import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>
            <Image src="/logo.svg" alt="Skirade Logo" width={200} height={24} />
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/scout">scout</Link>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>&nbsp;|&nbsp;</li>
          <li>
            <Link href="/explore">explore</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/signup">signup</Link>
          </li>
          <li>
            <Link href="/login">login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
