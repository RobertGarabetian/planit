import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Modal from "@/components/old-stuff/modal";

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

  if (!user) {
    return redirect("/sign-in");
  }

  // Get today's date
  let date = new Date();
  let month = date.getMonth();
  let currentMonthName = monthNames[month];

  // Get the current week's dates
  const weekDays = getWeekDays(date);

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
              <Modal />
              <div className="size-1/12 border-r border-b mt-auto ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
