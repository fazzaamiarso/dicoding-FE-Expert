import { css } from "lit";

export const navbarStyles = css`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1rem;
  }
  .navbar__nav {
    display: none;
  }
  @media screen and (min-width: 640px) {
    .navbar__nav {
      display: block;
    }
  }
  .navbar__title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  .navbar__list {
    list-style: none;
    display: flex;
    gap: 2.5rem;
  }
  .navbar__link {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    color: var(--text-indigo-100);
    text-decoration: none;
    font-weight: 500;
    transition: all 200ms ease-in-out;
  }
  .navbar__link:hover {
    color: var(--text-indigo-400);
  }
  .navbar__link:focus-visible {
    outline: 2px solid var(--text-indigo-600);
    outline-offset: 4px;
  }
  .navbar__menu-button {
    background-color: transparent;
    border: none;
  }
  .navbar__menu-button svg {
    fill: white;
    width: max-content;
  }
  @media screen and (min-width: 640px) {
    .navbar__menu-button {
      display: none;
    }
  }
`;
