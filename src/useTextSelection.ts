import { useCallback, useLayoutEffect, useState } from "react";

type ClientRect = Record<keyof Omit<DOMRect, "toJSON">, number>;

function roundValues(_rect: ClientRect) {
  const rect: ClientRect = { ..._rect };
  for (const key of Object.keys(rect) as Array<keyof ClientRect>) {
    rect[key] = Math.round(rect[key]);
  }
  return rect;
}

function shallowDiff(prev?: ClientRect, next?: ClientRect): boolean {
  if (prev != null && next != null) {
    for (const key of Object.keys(next) as Array<keyof ClientRect>) {
      if (prev[key] !== next[key]) {
        return true;
      }
    }
  } else if (prev !== next) {
    return true;
  }
  return false;
}

type TextSelectionState = {
  clientRect?: ClientRect;
  isCollapsed?: boolean;
  textContent?: string;
};

const defaultState: TextSelectionState = {};

/**
 * useTextSelection(ref)
 *
 * @description
 * hook to get information about the current text selection
 *
 */
export function useTextSelection(target?: HTMLElement) {
  const [{ clientRect, isCollapsed, textContent }, setState] =
    useState<TextSelectionState>(defaultState);

  const handler = useCallback(() => {
    setState((prev) => {
      const selection = window.getSelection();
      const nextState: TextSelectionState = {};

      if (selection == null || !selection.rangeCount) {
        return defaultState;
      }

      const range = selection.getRangeAt(0);

      if (target != null && !target.contains(range.commonAncestorContainer)) {
        return defaultState;
      }

      const contents = range.cloneContents();

      if (contents.textContent != null) {
        nextState.textContent = contents.textContent;
      }

      const rects = range.getClientRects();
      let computedRect: ClientRect | undefined;

      if (rects.length === 0 && range.commonAncestorContainer != null) {
        const node = range.commonAncestorContainer;
        const el =
          node.nodeType === Node.ELEMENT_NODE
            ? (node as Element)
            : node.parentElement ?? document.body;
        const r = el.getBoundingClientRect();
        computedRect = roundValues({
          x: r.x,
          y: r.y,
          top: r.top,
          right: r.right,
          bottom: r.bottom,
          left: r.left,
          width: r.width,
          height: r.height,
        });
      } else if (rects.length > 0) {
        const r0 = rects[0];
        computedRect = roundValues({
          x: r0.x,
          y: r0.y,
          top: r0.top,
          right: r0.right,
          bottom: r0.bottom,
          left: r0.left,
          width: r0.width,
          height: r0.height,
        });
      }

      if (computedRect && shallowDiff(prev.clientRect, computedRect)) {
        nextState.clientRect = computedRect;
      }
      nextState.isCollapsed = range.collapsed;

      return nextState;
    });
  }, [target]);

  useLayoutEffect(() => {
    document.addEventListener("selectionchange", handler);
    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);
    window.addEventListener("resize", handler);

    return () => {
      document.removeEventListener("selectionchange", handler);
      document.removeEventListener("keydown", handler);
      document.removeEventListener("keyup", handler);
      window.removeEventListener("resize", handler);
    };
  }, [handler]);

  return {
    clientRect,
    isCollapsed,
    textContent,
  };
}
