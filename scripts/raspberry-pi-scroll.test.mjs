import assert from "node:assert/strict";
import test from "node:test";
import { getActivePart } from "../components/raspberry-pi/scroll.ts";

const sections = [
  { id: "overview", top: -500 },
  { id: "processor", top: 120 },
  { id: "memory", top: 840 },
  { id: "ports", top: 1520 },
];

test("focus follows the heading crossing the reading line", () => {
  assert.equal(getActivePart(sections, 119), "overview");
  assert.equal(getActivePart(sections, 120), "processor");
  assert.equal(getActivePart(sections, 839), "processor");
  assert.equal(getActivePart(sections, 840), "memory");
});

test("jumping or scrolling backwards selects the visible chapter without history", () => {
  assert.equal(getActivePart(sections, 2000), "ports");
  assert.equal(getActivePart(sections, 900), "memory");
  assert.equal(getActivePart(sections, -700), "overview");
});

test("the mobile reading line below the pinned model controls focus", () => {
  const mobile = [
    { id: "overview", top: -600 },
    { id: "processor", top: -100 },
    { id: "memory", top: 350 },
  ];
  assert.equal(getActivePart(mobile, 300), "processor");
  assert.equal(getActivePart(mobile, 380), "memory");
});

test("an empty article falls back to the complete board", () => {
  assert.equal(getActivePart([], 300), "overview");
});
