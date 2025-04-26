import { useNavigate } from "react-router-dom";





export default function Home() {    
    const navigate = useNavigate();
    return (
        <div dir="rtl" className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-cyan-600 mb-4 text-center">ברוכים הבאים</h3>
        <div className="space-y-4">
          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
            onClick={() => navigate('/ProducerDashboard')}
          >
            כניסת מפיקות
          </button>
          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition"
            onClick={() => navigate('/EventListForUsers')}
          >
            כניסת משתמשים רגילים
          </button>
        </div>
      </div>
    )
}   