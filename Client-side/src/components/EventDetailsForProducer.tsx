import { useLocation } from "react-router-dom";
import { updateEvent } from "../services/EventApi";
import { useEffect, useState } from "react";

interface Event {
  name: string;
  description: string;
  producerId: string;
}

export const EventDetailsForProducer = () => {
  const location = useLocation();
  const [showInput, setShowInput] = useState(false);

  const { event, email } = location.state || {}; // שליפת הנתונים שהועברו
  const [_event, _setEvent] = useState<Event>(
    event || { name: "", description: "", producerId: "" }
  );

  if (!event) {
    return <div>שגיאה: אין נתוני אירוע</div>;
  }

  const editEvent = async () => {
    try {
      const result = await updateEvent(_event); // שימוש ב-_event במקום event
      alert("האירוע עודכן בהצלחה");
      console.log(result);
      setShowInput(false); // סגירת הטופס לאחר שמירה
    } catch (error) {
      console.error("Error in updateEvent:", error);
      alert("שגיאה בעדכון האירוע.");
    }
  };

  useEffect(() => {
    console.log("Updated producer:", _event);
  }, [_event]); // יפעל כל פעם שהסטייט משתנה

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    _setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-cyan-600 mb-4 text-center">{_event.name}</h1>
      <div className="space-y-4">
        <p className="text-gray-700">{_event.description}</p>
        <p className="text-sm text-gray-500">מפיקה: {_event.producerId}</p>
        <p className="text-sm text-gray-500">אימייל המפיקה: {email}</p>
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
          >
            לעריכת האירוע
          </button>
        )}
        {showInput && (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={_event.name}
              onChange={handleInputChange}
              placeholder="שם"
              className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              name="description"
              value={_event.description}
              onChange={handleInputChange}
              placeholder="תיאור"
              className="w-full border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={editEvent}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
            >
              שמור
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl transition"
            >
              ביטול
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsForProducer;