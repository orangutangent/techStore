import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <nav className="bg-slate-800 text-white p-4 w-full flex navbar">
        <span
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/");
          }}
          className="text-3xl  navLogo cursor-pointer"
        >
          TechStore
        </span>
        <ul className="list-none p-0  flex ms-auto me-2 md:me-10 justify-between navLinks ">
          <li>
            <Link className={location.pathname == "/" ? "active" : ""} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname == "/cart" ? "active" : ""}
              to="/cart"
            >
              <TiShoppingCart size={25} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
