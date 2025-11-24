"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher/client";
import { EventData } from "../_components/events-table/columns/Columns";


export function useEventsRealtime(
  onCreated: (event: EventData) => void,
  onUpdated: (event: EventData) => void,
  onDeleted: (eventId: string) => void
) {
  useEffect(() => {
    const channel = pusherClient.subscribe("events");

    channel.bind("event-created", onCreated);
    channel.bind("event-updated", onUpdated);
    channel.bind("event-deleted", onDeleted);

    return () => {
      channel.unbind("event-created", onCreated);
      channel.unbind("event-updated", onUpdated);
      channel.unbind("event-deleted", onDeleted);
      pusherClient.unsubscribe("events");
    };
  }, [onCreated, onUpdated, onDeleted]);
}