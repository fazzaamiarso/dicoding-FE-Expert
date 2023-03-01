import { describe, expect, it, vi } from "vitest";
import { fixture, html } from "@open-wc/testing";
import { screen, within } from "shadow-dom-testing-library";
import type { LazyImage } from "@/components";
import "@/components/lazy-image";

// @vitest-environment jsdom
describe("lazy-image", async () => {
  const mockImage = "random.png";
  const altText = "a text for testing";
  it("load image immediately if IntersectionObserver and native lazy loading aren't supported!", async () => {
    (await fixture(html`<lazy-image data-src=${mockImage}></lazy-image>`)) as LazyImage;
    expect(window.IntersectionObserver).toBeUndefined();
    expect("loading" in HTMLImageElement.prototype).toBeFalsy();
    const img = await screen.findByShadowRole("img");
    expect(img.getAttribute("src")).toBe(mockImage);
  });
  it("set attributes correctly", async () => {
    const width = "50";
    const height = "600";
    const renderedEl = (await fixture(
      html`<lazy-image
        data-src=${mockImage}
        width=${width}
        height=${height}
        alt=${altText}
        .imageStyle=${{ color: "red" }}
      ></lazy-image>`
    )) as LazyImage;
    const img = within(renderedEl).getByShadowRole("img");
    expect(img.getAttribute("width")).toBe(width);
    expect(img.getAttribute("height")).toBe(height);
    expect(img.getAttribute("alt")).toBe(altText);
    expect(img.style.color).toBe("red");
  });

  it("works with IntersectionObserver when native lazy loading not supported!", async () => {
    const IntersectionObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    }));
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    expect(window.IntersectionObserver).toBeDefined();
    const renderedEl = (await fixture(
      html`<lazy-image data-src=${mockImage}></lazy-image>`
    )) as LazyImage;
    await renderedEl.updateComplete;
  });
});
