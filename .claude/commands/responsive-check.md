---
description: Measure a page across screen widths and report overflow, using the same-origin iframe harness that works around a maximized window.
---

Run the responsive check CLAUDE.md requires for any new page or UI, on: $ARGUMENTS

(If no path was given, ask which route to check before doing anything else.)

## Why the obvious approach fails

`resize_window` reports success but does nothing when the browser window is
maximized — `innerWidth` stays put and every width reads identically. Load the
page in a **same-origin iframe** instead; media queries follow the iframe's
width. Compensate for the scrollbar so the iframe's viewport equals the width
you meant to test.

## Setup

1. A dev server usually runs on :3000. Check before starting one — Next refuses
   a second instance and the failure is confusing.
2. Lesson routes are behind the auth gate in `proxy.ts`; `curl` gets a 307 to
   `/login`. Drive them through the browser, where the session cookie exists.
3. Navigate a tab to any same-origin page, then replace the document with a
   single `<iframe id="probe">` and define helpers on `window`:
   - `__setVw(url, targetWidth)` — load, measure the scrollbar, widen the iframe
     by that much, return the achieved viewport width
   - `__measure()` — walk `body *`, flag elements whose `right` exceeds the
     viewport **unless** an ancestor has `overflow-x: auto|scroll`
   - `__sweep(url, widths)` — loop the two above

## Widths

320, 390, 641, 768, 769, 1024, 1025, 1280 — the plain breakpoints **and the
width just past each one**. `app/problems/[slug]` shipped with its buttons off
screen at 1024–1250px, where `lg:grid-cols-2` halves the column while the
toolbar keeps full width. Checking only the narrow end misses that entirely.

Run at most one URL per JS call. Several URLs in one call exceeds the CDP
timeout, and a timed-out sweep keeps mutating the iframe in the background —
its results then bleed into the next call and look like real overflow.

## What counts as a bug

`documentElement.scrollWidth > innerWidth` on the page itself is a bug. A wide
table or code block extending past the viewport is **not**, provided it scrolls
inside an `overflow-x: auto` container — inside `overflow: hidden` the content
is simply unreachable.

## Numbers are not enough

Screenshot the flagged widths and look. Overlap, squeezing, and text that wraps
into a five-line heading do not show up in a scrollWidth comparison.

## Report

Per width: viewport, overflow yes/no, and the offending element when there is
one. Say plainly which widths you could not check and why — an unchecked width
reported as passing is worse than an admitted gap.

Clean up afterwards: close the tab you opened, and stop any dev server you
started (verify the port is actually free — `TaskStop` has left Next running).
