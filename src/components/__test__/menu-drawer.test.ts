/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { afterEach, describe, expect, it, beforeEach } from "vitest";
import { fixture, html, expect as DOMExpect, fixtureCleanup } from "@open-wc/testing";
import { screen, within } from "shadow-dom-testing-library";
import userEvent from "@testing-library/user-event";
import "../menu-drawer";
import MenuDrawer from "../menu-drawer";

// @vitest-environment jsdom

const user = userEvent.setup();

describe("menu-drawer", () => {
  let drawer: MenuDrawer;
  let triggerButton: HTMLButtonElement;
  beforeEach(async () => {
    (await fixture(html`
      <button data-testid="trigger" type="button">open drawer</button>
      <menu-drawer></menu-drawer>
    `)) as MenuDrawer;

    triggerButton = screen.getByTestId("trigger");
    drawer = document.querySelector("menu-drawer") as MenuDrawer;
    drawer.setTriggerElement(triggerButton);
  });
  afterEach(() => {
    fixtureCleanup();
  });

  it("toggles the open state properly", async () => {
    const focusablesEl = (drawer.renderRoot as ShadowRoot).querySelectorAll("a, button");
    focusablesEl.forEach((element) => {
      expect(element.getAttribute("tabindex")).toBe("-1");
    });

    await user.click(triggerButton);
    expect(drawer.open).toBe(true);

    focusablesEl.forEach((element) => {
      expect(element.getAttribute("tabindex")).toBe("0");
    });

    const closeButton = await within(drawer).findByShadowRole("button");
    await user.click(closeButton);
    expect(drawer.open).toBe(false);
  });

  it("closes drawer when overlay is clicked", async () => {
    await user.click(triggerButton);

    const overlayEl = await within(drawer).findByShadowTestId("overlay");
    await user.click(overlayEl);
    expect(drawer.open).toBe(false);
  });

  it("focus to first focusable element on open", async () => {
    await user.click(triggerButton);

    expect(drawer.triggerElement).toEqual(triggerButton);

    const closeButton = await within(drawer).findByShadowRole("button");
    DOMExpect((drawer.renderRoot as ShadowRoot).activeElement).to.eq(closeButton);
  });

  it("traps the focus inside drawer", async () => {
    await user.click(triggerButton);

    const focusablesEl = (drawer.renderRoot as ShadowRoot).querySelectorAll("a, button");
    await user.tab({ shift: true });

    DOMExpect((drawer.renderRoot as ShadowRoot).activeElement).to.eq(
      focusablesEl[focusablesEl.length - 1]
    );

    await user.tab();
    DOMExpect((drawer.renderRoot as ShadowRoot).activeElement).to.eq(focusablesEl[0]);
  });
});
