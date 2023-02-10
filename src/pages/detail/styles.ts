import { css } from "lit";

export const detailStyles = css`
  .detail {
    --bg-header: rgba(199 210 254 / 0.25);
    display: grid;
    gap: 2rem;
    overflow: hidden;
  }
  .detail__action {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
  .detail__back {
    border: none;
    background-color: var(--bg-header);
    border-radius: var(--rounded-md);
    padding: 0.5rem;
  }
  .detail__back svg {
    color: var(--text-indigo-100);
    width: 25px;
  }
  .detail__favorite {
    margin-left: auto;
    border: none;
    background-color: var(--bg-header);
    border-radius: var(--rounded-md);
    padding: 0.5rem;
  }
  .detail__favorite svg {
    width: 25px;
    color: red;
  }
  .detail__overlay {
    position: absolute;
    z-index: 5;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgb(19, 19, 21), transparent);
  }
  .detail__img {
    --blur-value: 8px;
    --grayscale-value: 0.65;
    position: relative;
    min-height: 300px;
    width: 100%;
    filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
    -webkit-filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
  }
  .detail__header {
    position: relative;
    max-height: 420px;
    overflow: hidden;
    width: 100%;
  }
  .detail__header--inner {
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
  }
  .detail__header--content {
    display: grid;
    gap: 0.25rem;
    position: relative;
    padding-block: 1.5rem;
  }
  @media screen and (min-width: 640px) {
    .detail__name {
      font-size: 2.5rem;
    }
  }
  .detail__rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .detail__rating svg {
    fill: #facd15;
    width: 18px;
  }
  .detail__category {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .detail__category-item {
    font-size: var(--text-sm);
    background-color: var(--bg-header);
    padding: 0.35rem;
    border-radius: var(--rounded-md);
  }
  .detail__content {
    display: grid;
    gap: 2rem;
  }
  .detail__desc {
    max-width: 65ch;
  }
  .detail__menu {
    display: grid;
    gap: 2.25rem;
  }
  .detail__menu-header {
    margin-bottom: 1rem;
  }
  .detail__menu-list {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(var(--column-size, 1), minmax(0, 1fr));
  }
  @media screen and (min-width: 640px) {
    .detail__menu-list {
      --column-size: 2;
    }
  }
  @media screen and (min-width: 1024px) {
    .detail__menu-list {
      --column-size: 3;
    }
  }
  .detail__menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .review {
    display: grid;
    gap: 2rem;
    max-width: 600px;
  }
  .review__form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .review__input-container {
    display: grid;
    margin-bottom: 1rem;
  }
  .review__textarea {
    resize: vertical;
  }

  .review__list {
    display: grid;
    gap: 1.1rem;
  }
  .review__item {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.25rem;
    background-color: #141e2f;
  }
  .review__date {
    font-size: var(--text-sm);
  }
  .review__avatar {
    padding-top: 0.5rem;
    width: 40px;
    border-radius: var(--rounded-sm);
  }

  .loading__catalog {
    padding: 1rem;
    width: 100%;
    min-height: 100px;
    background-color: #0f141d;
  }

  .loading__content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .loading__stack {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .loading__stack.loading__stack--row {
    flex-direction: row;
  }
  .loading__stack.loading__stack--md {
    max-width: 500px;
  }
  .loading__block {
    position: relative;
    background-color: darkgray;
    border-radius: var(--rounded-sm);
    width: var(--block-w, 100%);
    height: var(--block-h, 20px);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .loading__block.loading__block--title {
    --block-h: 70px;
    --block-w: 100%;
    margin-bottom: 0.5rem;
  }
  .loading__block.loading__block--text {
    --block-h: 10px;
    --block-w: 80%;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
