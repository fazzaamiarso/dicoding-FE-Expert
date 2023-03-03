import { describe, expect, it } from "vitest";
import { USER_AVATAR_URL } from "@/constants";
import { formatRatingDisplay } from "../format-rating";
import { generateRandomAvatar } from "../generate-random-avatar";

describe("format-rating", () => {
  it("format numbers correctly", () => {
    expect(formatRatingDisplay(3)).toEqual("3.0");
    expect(formatRatingDisplay(3.55)).toEqual("3.6");
    expect(formatRatingDisplay(4.01)).toEqual("4.0");
    expect(formatRatingDisplay(4.0111111111)).toEqual("4.0");
  });
});

describe("generate-random-avatar", () => {
  it("create correct avatar url", () => {
    expect(generateRandomAvatar("bambang")).toEqual(`${USER_AVATAR_URL}?seed=bambang`);
  });
});
