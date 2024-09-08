import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Modal from "@/components/old-stuff/modal";
import CollapsedEvent from "@/components/collapsed-event";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getWeekDays(date: Date) {
  const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const current = new Date(firstDayOfWeek);
    current.setDate(current.getDate() + i);
    return current;
  });
  return weekDays;
}

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  if (!user) {
    return redirect("/sign-in");
  }

  // Get today's date
  let date = new Date();
  let month = date.getMonth();
  type Event = {
    id: number;
    event_name: string;
    event_date: string; // Adjust this based on your DB schema
  };

  let currentMonthName = monthNames[month];
  function formatDateToLocal(day: Date) {
    const localDate = new Date(day);
    const offset = day.getTimezoneOffset();
    day.setMinutes(day.getMinutes() - offset);
    return day.toISOString().split("T")[0];
  }
  // Get the current week's dates
  const weekDays = getWeekDays(date);
  const eventsPromises: Array<Promise<Array<Event>>> = weekDays.map(
    async (day) => {
      const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user_id)
        .eq("event_date", formatDateToLocal(day)); // Adjust based on your date format

      if (error) {
        console.error("Error fetching events:", error);
        return [];
      }

      return events || [];
    }
  );
  const weekEvents = await Promise.all(eventsPromises);

  return (
    <div className=" text-white">
      <div className="rounded-none bg-slate-700 p-5">
        <h1 className="text-4xl font-bold ">{currentMonthName}</h1>

        <h1 className="text-4xl font-bold ">
          Week of {weekDays[0].toLocaleDateString()} -{" "}
          {weekDays[6].toLocaleDateString()}
        </h1>

        <div className="grid grid-rows-1 grid-cols-7 font-medium text-2xl mt-10 border-b divide-x">
          {weekNames.map((day, index) => (
            <div className="px-4 text-left" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-1 grid-cols-7 justify-items-center mt-4">
          {weekDays.map((day, index) => (
            <div
              className="text-left w-full h-72 flex flex-col p-2"
              key={index}
            >
              <div className="w-full text-left">{day.getDate()}</div>

              {/* Render events for each day */}
              {weekEvents[index].length > 0 ? (
                weekEvents[index].map((event: Event) => (
                  <CollapsedEvent key={event.id} event={event} />
                ))
              ) : (
                <div>No events</div>
              )}
              <Modal />
              <div className="size-1/12 border-r border-b mt-auto ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
