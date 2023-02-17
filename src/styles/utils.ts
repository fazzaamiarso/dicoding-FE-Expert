import { css } from "lit";

// eslint-disable-next-line import/prefer-default-export
export const utilClasses = css`
  .layout {
    width: 90%;
    margin-inline: auto;
    max-width: 1000px;
  }

  .click-area {
    min-height: 44px;
    min-width: 44px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
