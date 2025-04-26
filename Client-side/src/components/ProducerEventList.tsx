import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { addEvent, deleteEvent, getEventById } from "../services/EventApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProducerEventList = ({ email }: { email: string }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [eventsList, setEventList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);

  useEffect(() => {
    if (email) {
      getEventByEmail();
    }
  }, [email]); // נפעיל את הפונקציה כש-email משתנה

  const getEventByEmail = async () => {
    try {
      const response = await getEventById(email);
      setEventList(response);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventList([]);
    }
  }
  const deleteEventById = async (id:number) => {
    try {
      await deleteEvent(id);
      setEventList((prevEvents) => prevEvents.filter((event) => event.id !== id));
      alert("האירוע נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
  

  return (
    <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
    <h3 className="text-xl font-bold text-cyan-600 mb-4 text-center">רשימת אירועים</h3>
    <div className="space-y-4">
      {eventsList.length > 0 ? (
        eventsList.map((event) => (
          <div
            key={event.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
            <div className="flex justify-between items-center mt-2">
              <Link
                to="/EventDetailsForProducer"
                state={{ event, email }}
                className="text-cyan-500 hover:underline"
              >
                לפרטי האירוע
              </Link>
              <button
                onClick={() => deleteEventById(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-xl transition"
              >
                מחיקה
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">לא נמצאו אירועים</p>
      )}
      <button
        onClick={() =>
          navigate("/AddEvent", {
            state: { producerId: eventsList[0]?.producerId },
          })
        }
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
      >
        הוספת אירוע
      </button>
    </div>
  </div>
  );
};

export default ProducerEventList;
