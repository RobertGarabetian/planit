import { createClient } from "@/utils/supabase/server";
import React from "react";

type EventProps = {
  event: {
    id: number;
    event_name: string;
    event_date: string;
  };
};
const CollapsedEvent = ({ event }: EventProps) => {
  const supabase = createClient();
  return (
    <div className="w-full">
      <button className="flex flex-row w-full btn btn-outline justify-between">
        <div>{event.event_name}</div>
        <div>...</div>
      </button>
    </div>
  );
};

export default CollapsedEvent;
