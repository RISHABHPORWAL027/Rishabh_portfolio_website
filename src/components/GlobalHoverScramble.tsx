"use client";

import { useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01!@#$%";
const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "button",
  "header a",
  "nav a",
  "[data-scramble-hover]",
].join(", ");

type TextSnapshot = {
  node: Text;
  text: string;
};

const snapshots = new WeakMap<HTMLElement, TextSnapshot[]>();
const intervals = new WeakMap<HTMLElement, ReturnType<typeof setInterval>>();
const activeElements = new Set<HTMLElement>();

function getTextNodes(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.textContent?.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }

  return nodes;
}

function scrambleText(text: string, step: number) {
  return text
    .split("")
    .map((ch, i) => {
      if (!/[A-Za-z0-9]/.test(ch)) return ch;
      return i < step - 6 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

function restore(element: HTMLElement) {
  const id = intervals.get(element);
  if (id) {
    clearInterval(id);
    intervals.delete(element);
  }

  const original = snapshots.get(element);
  if (original) {
    original.forEach(({ node, text }) => {
      node.textContent = text;
    });
    snapshots.delete(element);
  }
  activeElements.delete(element);
}

function runScramble(element: HTMLElement) {
  restore(element);

  const original = getTextNodes(element).map((node) => ({
    node,
    text: node.textContent ?? "",
  }));

  if (!original.length || !original.some(({ text }) => /[A-Za-z0-9]/.test(text))) {
    return;
  }

  snapshots.set(element, original);
  activeElements.add(element);

  let step = 0;
  const maxLength = Math.max(...original.map(({ text }) => text.length));
  const id = setInterval(() => {
    if (step > maxLength + 8) {
      restore(element);
      return;
    }

    original.forEach(({ node, text }) => {
      node.textContent = scrambleText(text, step);
    });
    step++;
  }, 35);

  intervals.set(element, id);
}

export function GlobalHoverScramble() {
  useEffect(() => {
    const findTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest(TEXT_SELECTOR) as HTMLElement | null;
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = findTarget(event.target);
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      runScramble(target);
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = findTarget(event.target);
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      restore(target);
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      activeElements.forEach(restore);
    };
  }, []);

  return null;
}
