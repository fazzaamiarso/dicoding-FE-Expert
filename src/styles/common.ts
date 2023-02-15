import { css } from "lit";

export const commonStyles = css`
  .error__container {
    padding-block: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
  .error__title {
    font-size: 1.75rem;
    color: var(--logo-color);
  }
`;
