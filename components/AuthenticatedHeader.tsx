import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const AuthenticatedHeader = () => {
  return (
    <header>
      <nav className="navbar bg-base-100 text-neutral">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Ценоразпис</a>
              </li>
              <li>
                <a>Магазини</a>
              </li>
              <li>
                <a>История</a>
              </li>
              <li>
                <a>
                  <strong>Заяви доставка</strong>
                </a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl px-2.5">
            <img
              src="/images/brand/logo.png"
              alt="DEX logo"
              className="h-[50px]"
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <a>Ценоразпис</a>
            </li>
            <li>
              <a>Магазини</a>
            </li>
            <li>
              <a>История</a>
            </li>
            <li>
              <a>
                <strong>Заяви доставка</strong>
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-1.5 max-md:gap-1">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};
