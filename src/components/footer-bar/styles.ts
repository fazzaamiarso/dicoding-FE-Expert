import { css } from "lit";

export const footerStyles = css`
  .footer {
    @extend .layout;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
    padding-block: 2rem;
  }
  .footer__copyright span {
    font-style: italic;
  }
  .footer__list {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .footer__link {
    display: inline-block;
  }
  .footer__link svg {
    margin-inline: auto;
    width: 28px;
    color: white;
    transition: all 200ms ease-in-out;
  }
  .footer__link:hover svg {
    color: var(--text-indigo-400);
  }
  .footer__link:focus-visible {
    outline: 2px solid var(--text-indigo-600);
    outline-offset: 4px;
  }
`;
