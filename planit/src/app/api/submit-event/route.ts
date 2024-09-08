import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {



  const { event_name, start_time, end_time, event_description, event_date } = await req.json();

  const supabase = createClient();
  const {
    data
  } = await supabase.auth.getUser();
  const user_id = data?.user?.id;

  const { error } = await supabase.from("events").insert({
    event_name,
    start_time,
    end_time,
    event_description,
    event_date,
    user_id
  });

  if (error) {
    console.error("Error creating event:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Event created successfully" }, { status: 200 });
}
