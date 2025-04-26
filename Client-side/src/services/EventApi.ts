import axios from "axios";

const API_URL = "http://localhost:3000"; // כתובת השרת שלך 

export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/event`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

export const getEventById = async (producerId: String) => {
    try {
        const response = await axios.get(`${API_URL}/event/${producerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event:", error);
        return [];
    }
}

export const addEvent = async (event: any) => {
    try {
        const response = await axios.post(`${API_URL}/event`, event, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    } catch (error) {
        console.error('Error in addEvent:', error);
        throw error;
    }
}

export const updateEvent = async (event: any) => {
    try {
        const response = await axios.put(`${API_URL}/event/${event.id}`, event, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateEvent:', error);
        throw error;
    }
}

export const deleteEvent = async (id: number) => {  
    try {
        const response = await axios.delete(`${API_URL}/event/${id}`);
        return response.data;   
    }
    catch (error) {
        console.error('Error in deleteEvent:', error);
        throw error;
    }   
}


