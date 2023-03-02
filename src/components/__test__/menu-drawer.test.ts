/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, expect, it } from "vitest";
import { fixture, html, expect as DOMExpect } from "@open-wc/testing";
import { screen, within } from "shadow-dom-testing-library";
import userEvent from "@testing-library/user-event";
import "../menu-drawer";
import MenuDrawer from "../menu-drawer";

// @vitest-environment jsdom

const user = userEvent.setup();

describe("menu-drawer", () => {
  it("focus to first focusable element on open", async () => {
    (await fixture(html`
      <button data-testid="trigger" type="button">open drawer</button>
      <menu-drawer></menu-drawer>
    `)) as MenuDrawer;
    const triggerButton = screen.getByTestId("trigger");
    const drawer = document.querySelector("menu-drawer") as MenuDrawer;
    drawer.setTriggerElement(triggerButton);

    await user.click(triggerButton);

    expect(drawer.triggerElement).toEqual(triggerButton);
    expect(drawer.open).toBe(true);

    const closeButton = await within(drawer).findByShadowRole("button");
    DOMExpect((drawer.renderRoot as ShadowRoot).activeElement).to.eq(closeButton);
  });
});
