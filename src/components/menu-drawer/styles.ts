import { css } from "lit";

export const drawerStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: 1000;
  }
  @media screen and (min-width: 640px) {
    :host {
      display: none;
    }
  }

  .menu__overlay {
    --overlay-opacity: 0;
    --overlay-scale: 0;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 300ms ease;

    opacity: var(--overlay-opacity);
    transform: scale(var(--overlay-scale));
  }
  .menu__overlay.is-open {
    --overlay-opacity: 1;
    --overlay-scale: 1;
  }
  .menu {
    --translateX: 100%;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(var(--translateX));

    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 300px;
    min-height: 100vh;
    background-color: var(--text-indigo-50);
    padding: 2rem;
    transition: all 100ms ease-in;
  }
  .menu.is-open {
    --translateX: 0%;
  }

  .menu__close {
    @extend .click-area;
    display: block;
    align-items: center;

    background-color: transparent;
    border: none;
    margin-left: auto;
  }
  .menu__list {
    list-style: none;
    padding: 0;
    display: grid;
    row-gap: 2rem;
  }
  .menu__link {
    @extend .click-area;
    width: 100%;
    display: inline-flex;
    align-items: center;

    color: var(--text-indigo-700);
    font-weight: 600;
    font-size: 1.4rem;
    text-decoration: none;
  }
`;
