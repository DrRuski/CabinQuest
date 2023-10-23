export default function Header() {
  return (
    <header>
      <NavBar />
    </header>
  );
}

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">UserProfile</a>
        </li>
      </ul>
    </nav>
  );
}
