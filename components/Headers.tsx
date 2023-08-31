import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export const InformationalHeader = () => {
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
                <a>Предимства</a>
              </li>
              <li>
                <a>Как работи?</a>
              </li>
              <li>
                <a>Отзиви</a>
              </li>
              <li>
                <a>За нас</a>
              </li>
              <li>
                <a>Ценоразпис</a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl px-2.5">
            <Image
              height={50}
              width={122}
              src="/images/brand/logo.png"
              alt="DEX logo"
              className="h-[50px]"
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <a>Предимства</a>
            </li>
            <li>
              <a>Отзиви</a>
            </li>
            <li>
              <a>За нас</a>
            </li>
            <li>
              <a>
                <strong>Ценоразпис</strong>
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-1.5 max-md:gap-1">
          <SignInButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
            <a className="btn max-md:text-xs">Sign In</a>
          </SignInButton>
          <SignUpButton afterSignInUrl="/" afterSignUpUrl="/" mode="modal">
            <a className="btn btn-primary max-md:text-xs">Register</a>
          </SignUpButton>
        </div>
      </nav>
    </header>
  );
};

export const AuthenticatedHeader = () => {
  return (
    <>
      <header className="sticky top-0 h-auto z-50 backdrop-filter backdrop-blur-[9px] bg-transparenty-base-100 backdrop-brightness-125">
        <nav className="navbar text-neutral">
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
                  <Link href="/history">История</Link>
                </li>
                <li>
                  <Link href="/delivery/new">
                    <strong>Заяви доставка</strong>
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/" className="btn btn-ghost normal-case text-xl px-2.5">
              <Image
                height={50}
                width={122}
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
                <Link href="/history">История</Link>
              </li>
              <li>
                <Link href="/delivery/new">
                  <strong>Заяви доставка</strong>
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-1.5 max-md:gap-1">
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </header>
      <div className="w-full h-[20px]"></div>
    </>
  );
};
