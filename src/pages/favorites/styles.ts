import { css } from "lit";

export const favoriteStyles = css`
  .favorite__list {
    --row-gap: 1.5rem;
    --column-gap: 1.75rem;
    width: 100%;
    display: grid;
    row-gap: var(--row-gap);
    column-gap: var(--column-gap);
  }
  .favorite__empty {
    width: 100%;
    padding-block: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
  }
  .favorite__empty-title {
    font-size: 2rem;
    color: var(--text-indigo-300);
  }
  .favorite__empty-cta {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.7rem;
    font-weight: 600;
    color: black;
    background-color: #65dca2;
    border-radius: var(--rounded-sm);
    text-decoration: none;
  }
  @media screen and (min-width: 648px) {
    .favorite__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media screen and (min-width: 1024px) {
    .favorite__list {
      --column-gap: 1.5rem;
      --row-gap: 1.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;
