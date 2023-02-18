import { css } from "lit";

export const favoriteStyles = css`
  :host {
    display: block;
  }
  .detail__action {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--bg-header);
    border-radius: var(--rounded-md);
    padding: 0.5rem;
    outline: 2px solid transparent;
    cursor: pointer;
    transition: color 200ms ease-in-out;
  }
  .detail__action:hover,
  .detail__action:focus-visible {
    outline-color: var(--logo-color);
    outline-offset: 1px;
  }
  .detail__action--back svg {
    color: var(--text-indigo-100);
    width: 25px;
  }
  .detail__action--favorite {
    margin-left: auto;
  }
  .detail__action--favorite svg {
    color: red;
    width: 25px;
  }
`;
