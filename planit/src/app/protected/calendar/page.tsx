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

function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let date = new Date();
  let month = date.getMonth();

  let currentMonthName = monthNames[month];
  let year = date.getFullYear();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days = Array.from(
    { length: daysInMonth(month, year) },
    (_, i) => i + 1
  );
  const calendarGrid = [
    ...Array(firstDayOfWeek).fill(null), // Add empty slots for days before the first day
    ...days,
  ];
  const daysInWeek = Array.from({ length: 7 }, (_, i) => i);
  return (
    <div className=" text-white">
      <div className="rounded-none bg-slate-700 p-5">
        <h1 className="text-4xl font-bold ">{currentMonthName}</h1>

        <div className="grid grid-rows-1 grid-cols-7 font-medium text-2xl mt-10 border-b divide-x">
          {daysInWeek.map((days) => (
            <div className="px-4 text-left" key={days}>
              {weekNames[days]}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-5 grid-cols-7 justify-items-center mt-4">
          {calendarGrid.map((day) => (
            <div className="text-left w-full h-72 flex flex-col p-2" key={day}>
              {day ? (
                <>
                  <div className="w-full text-left">{day}</div>
                  <Modal />
                </>
              ) : null}
              <div className="size-1/12  border-r border-b mt-auto ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
