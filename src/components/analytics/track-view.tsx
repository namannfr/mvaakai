"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event when the page mounts. */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string> }) {
  const key = JSON.stringify(props ?? {});
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
