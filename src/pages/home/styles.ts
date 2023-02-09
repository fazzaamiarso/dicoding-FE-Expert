import { css } from "lit";

export const homeStyles = css`
  .hero {
    margin-bottom: 2rem;
    position: relative;
    max-height: 640px;
    overflow: hidden;
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: #0c111a;
    opacity: 0.55;
  }
  .hero__img {
    width: 100%;
  }
  @media screen and (min-width: 1200px) {
    .hero__img {
      min-width: 1000px;
    }
  }
  .hero__content {
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .hero__content--inner {
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
    color: white;
  }
  .hero__text {
    padding: 1rem 0.5rem;
    background-image: radial-gradient(black, transparent 70%);
  }
  .hero__header {
    color: var(--text-indigo-400);
    font-size: 1.3rem;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  @media screen and (min-width: 640px) {
    .hero__header {
      font-size: 2rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .hero__header {
      font-size: 3rem;
    }
  }
  .hero__desc {
    font-size: var(--text-sm);
    color: var(--text-indigo-100);
  }
  @media screen and (min-width: 640px) {
    .hero__desc {
      font-size: 1.1rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .hero__desc {
      font-size: 1.5rem;
    }
  }
  .hero__cta-group {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .hero__cta {
    display: inline-flex;
    align-items: center;

    text-decoration: none;
    border-radius: var(--rounded-sm);
    background-color: transparent;

    font-size: var(--text-xs);
    font-weight: 600;
    padding: 0.1rem 0.75rem;
  }
  @media screen and (min-width: 768px) {
    .hero__cta {
      font-size: 1rem;
      padding: 0.25rem 1rem;
    }
  }
  .hero__cta:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
  }

  .hero__cta--primary {
    color: white;
    background-color: var(--text-indigo-600);

    gap: 0.25rem;

    box-shadow: var(--shadow-md);
    border: var(--text-indigo-600) solid 1px;
    transition: all 200ms ease;
  }
  .hero__cta--primary:hover {
    background-color: var(--text-indigo-700);
  }
  .hero__cta--primary svg {
    width: 18px;
  }

  .hero__cta--secondary {
    color: var(--text-indigo-50);
    border: var(--text-indigo-50) solid 1px;
    border-radius: var(--rounded-sm);
    transition: 200ms all ease;
  }
  .hero__cta--secondary:hover {
    border-color: transparent;
  }

  .catalog__header {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
  @media screen and (min-width: 648px) {
    .catalog__header {
      font-size: 1.5rem;
    }
  }

  .catalog__list {
    --row-gap: 1.5rem;
    --column-gap: 1.75rem;
    width: 100%;
    display: grid;
    row-gap: var(--row-gap);
    column-gap: var(--column-gap);
  }
  @media screen and (min-width: 648px) {
    .catalog__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media screen and (min-width: 1024px) {
    .catalog__list {
      --column-gap: 1.5rem;
      --row-gap: 1.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

