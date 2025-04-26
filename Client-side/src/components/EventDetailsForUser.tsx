import { useLocation } from 'react-router-dom';
import { getProducerByEmail } from '../services/ProducerApi';
import { useState } from 'react';


export const EventDetailsForUser = () => {
    const location = useLocation();
    const { event } = location.state || {}; // שליפת הנתונים שהועברו

    if (!event) {
        return <div>שגיאה: אין נתוני אירוע</div>;
    }
    const [producer, setProducer] = useState({ name: "", phone: "", email: "", description: "" });
    const [showProducer, setShowProducer] = useState(false);
    const getProducer = async () => {
        try {
            const result = await getProducerByEmail(event.producerId);
            setProducer(result);
        } catch (error) {
            console.error("Error in getProducerByEmail:", error);
        }
    }
    return (
        <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-cyan-600 mb-4 text-center">{event.name}</h3>
      <div className="space-y-4">
        <p className="text-gray-700">{event.description}</p>
        <p className="text-sm text-gray-500">מפיק: {event.producerId}</p>
        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
          onClick={() => {
            getProducer();
            setShowProducer(true);
          }}
        >
          פרטי מפיקה
        </button>
      </div>
      {showProducer && (
        <div className="mt-6 border-t pt-4 space-y-4">
          <h4 className="text-lg font-bold text-cyan-600">פרטי מפיקה</h4>
          <p className="text-gray-700">שם: {producer.name}</p>
          <p className="text-gray-700">טלפון: {producer.phone}</p>
          <p className="text-gray-700">אימייל: {producer.email}</p>
          <p className="text-gray-700">תיאור: {producer.description}</p>
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl transition"
            onClick={() => setShowProducer(false)}
          >
            סגור
          </button>
        </div>
      )}
    </div>
    )
}
   