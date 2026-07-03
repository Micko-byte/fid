import type { Metadata } from "next";
import EventsClient from "@/components/events/EventsClient";

export const metadata: Metadata = {
  title: "Events | FID & Co. — Tribe Vibe, Suhba Series & The Capital Room",
  description:
    "Upcoming events and owned cultural platforms by FID & Co. — The Tribe Vibe, Suhba Series and The Capital Room. Lifestyle, conversation and leadership experiences across Africa.",
};

export default function EventsPage() {
  return <EventsClient />;
}
