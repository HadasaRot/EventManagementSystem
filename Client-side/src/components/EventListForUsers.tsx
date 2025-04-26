import { useEffect, useState } from 'react';

import { getEvents } from '../services/EventApi';
import { Link } from 'react-router-dom';

export const EventListForUsers = () => {
    const [eventsList, setEventList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);
    const [filterEventsList, setFilterEventsList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);

    useEffect(() => {
        getAllEvent();
    }
        , []);

    const getAllEvent = async () => {
        try {
            const response = await getEvents();
            setEventList(response);
            setFilterEventsList(response);
        } catch (error) {
            console.error("Error fetching events:", error);
            setEventList([]);
            setFilterEventsList([]);
        }
    }

    const filterEvents = (e: any) => {
        const value = e.target.value.toLowerCase();
        const filtered = eventsList.filter((event) => {
            return event.name.toLowerCase().includes(value);
        }

        );
        setFilterEventsList(filtered);
    };
    return (
        <div dir="rtl" className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-cyan-600 mb-4 text-center">רשימת אירועים למשתמשים רגילים</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="חפש אירוע..."
          onChange={filterEvents}
          className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="space-y-4">
        {filterEventsList.length > 0 ? (
          filterEventsList.map((event) => (
            <div
              key={event.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">מפיק: {event.producerId}</p>
              <Link
                to="/EventDetailsForUser"
                state={{ event }}
                className="text-cyan-500 hover:underline mt-2 inline-block"
              >
                לפרטים נוספים
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">לא נמצאו אירועים</p>
        )}
      </div>
    </div>
    )
}