"use client";
import { createClient } from "@/utils/supabase/server";
import { useState } from "react";
export default function Modal() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const event_name = formData.get("event_name");
    const start_time = formData.get("start_time");
    const end_time = formData.get("end_time");
    const event_description = formData.get("event_description");

    try {
      const res = await fetch("/api/submit-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name: event_name,
          start_time: start_time,
          end_time: end_time,
          event_description: event_description,
        }),
      });

      if (!res.ok) {
        throw new Error("Error creating event");
      }

      const data = await res.json();
      console.log("Event created successfully:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal?.close(); // Close the modal after submission
    }
  };
  return (
    <div className="w-full">
      <button
        className="btn btn-outline w-full"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        +
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 md:p-10 border rounded-lg shadow-lg bg-white text-black ">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Create Calendar Event</h1>
            <p className="text-gray-500">
              Fill out the details for your new event.
            </p>
          </div>
          <div>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Event Title */}
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Event Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="event_name"
                  className="border bg-transparent rounded-md p-2 w-full placeholder:text-black"
                  placeholder="My Event"
                />
              </div>
              {/* Start and End Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start_time" className="text-sm font-medium">
                    Start Time
                  </label>
                  <input
                    id="start_time"
                    name="start_time"
                    type="time"
                    className="border rounded-md p-2 w-full bg-transparent placeholder:text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="end_time" className="text-sm font-medium">
                    End Time
                  </label>
                  <input
                    id="end_time"
                    name="end_time"
                    type="time"
                    className="border rounded-md p-2 w-full bg-transparent placeholder:text-black"
                  />
                </div>
              </div>
              {/* Category */}
              {/* <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full max-w-xs bg-transparent"
                >
                  <option disabled selected>
                    None
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div> */}
              {/* Description */}
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="event_description"
                  className="border bg-transparent rounded-md p-2 w-full placeholder:text-black"
                  rows={5}
                  placeholder="Provide details about the event..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  className="btn btn-outline"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
