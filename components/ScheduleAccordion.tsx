"use client";

import { useState } from "react";

import type { ScheduleDay, ScheduleItem } from "@/lib/payload/fetchers";

type Props = {
  days: ScheduleDay[];
  trackKidsLabel: string;
  trackOlderLabel: string;
};

// SSR initialiser: openDayIndex=0, activeTrack="kids" — these values match
// the server-rendered HTML so there is no hydration mismatch and no anchor-scroll jump.
export function ScheduleAccordion({ days, trackKidsLabel, trackOlderLabel }: Props) {
  const [openDayIndex, setOpenDayIndex] = useState(0);
  const [activeTrack, setActiveTrack] = useState<"kids" | "older">("kids");

  return (
    <div className="schedule-acc">
      <div className="schedule-tabs">
        <button
          type="button"
          className={`schedule-tab${activeTrack === "kids" ? " is-active" : ""}`}
          aria-pressed={activeTrack === "kids"}
          onClick={() => setActiveTrack("kids")}
        >
          {trackKidsLabel}
        </button>
        <button
          type="button"
          className={`schedule-tab${activeTrack === "older" ? " is-active" : ""}`}
          aria-pressed={activeTrack === "older"}
          onClick={() => setActiveTrack("older")}
        >
          {trackOlderLabel}
        </button>
      </div>

      {days.map((day, idx) => {
        const isOpen = openDayIndex === idx;
        const bodyId = `schedule-day-body-${idx}`;
        const items: ScheduleItem[] = activeTrack === "kids" ? day.kidsItems : day.olderItems;

        return (
          <div key={day.id ?? idx} className={`schedule-day${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="schedule-day-head"
              aria-expanded={isOpen}
              aria-controls={bodyId}
              onClick={() => {
                if (!isOpen) setOpenDayIndex(idx);
                // clicking the already-open day is a no-op
              }}
            >
              <span className="schedule-day-label">{day.dateLabel}</span>
              {day.theme && <span className="schedule-day-theme">{day.theme}</span>}
              <span className="schedule-day-chevron" aria-hidden="true">
                {isOpen ? "▲" : "▼"}
              </span>
            </button>

            <div id={bodyId} className="schedule-day-body">
              <div className="schedule-track">
                {items.map((item, iIdx) => (
                  <div
                    key={item.id ?? iIdx}
                    className={`schedule-item${item.time ? "" : " no-time"}`}
                  >
                    {item.time && <span className="schedule-item-time">{item.time}</span>}
                    <div className="schedule-item-text">
                      <span className="schedule-item-title">{item.title}</span>
                      {item.description && (
                        <span className="schedule-item-desc">{item.description}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
