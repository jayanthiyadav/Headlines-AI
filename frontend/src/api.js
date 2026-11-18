const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Save a generated headline
export async function saveHeadline(headlineData) {
    const response = await fetch(`${API_URL}/api/headlines/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(headlineData)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to save headline");
    }

    return result;
}

// Get all saved headlines
export async function getHeadlines() {
    const response = await fetch(`${API_URL}/api/headlines/all`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch headlines");
    }

    return result;
}