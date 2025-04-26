import { useState  } from "react";
import { useLocation } from "react-router-dom";
import { addEvent } from "../services/EventApi";

export const AddEvent = () => {
  const location = useLocation();
  const { producerId } = location.state || {};
  const [message, setMessage] = useState("");
  const [event, setEvent] = useState({
    name: "",
    description: "",
    producerId: producerId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addEvent(event);
      setMessage("האירוע נוספה בהצלחה! 🎉");
      setEvent({ name: "", description: "", producerId });
      console.log('Event added:', result);
    } catch (error) {
      console.error('Error adding event:', error);
      setMessage("שגיאה בהוספת אירוע. נסה שוב.");
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-cyan-600 mb-4">הוספת אירוע</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">שם האירוע</span>
          <input
            className="w-full mt-1 border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="text" name="name" value={event.name} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="text-gray-700">תיאור האירוע</span>
          <input
            className="w-full mt-1 border rounded-xl p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="text" name="description" value={event.description} onChange={handleChange} required />
        </label>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition" type="submit">
          הוסף אירוע
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default AddEvent;  