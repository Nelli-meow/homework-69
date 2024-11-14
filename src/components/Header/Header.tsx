import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <div className="bg-primary-subtle">
      <header className="container py-4">
        <NavLink className="text-black p-2 fs-4 text-decoration-none" to="/">TV Shows</NavLink>
      </header>
    </div>
  );
};

export default Header;