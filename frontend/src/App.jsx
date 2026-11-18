import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tone, setTone] = useState("Creative");
  const [headlines, setHeadlines] = useState([]);
  const [savedHeadlines, setSavedHeadlines] = useState([]);
  const [saving, setSaving] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved headlines from Supabase through backend
  async function loadSavedHeadlines() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/headlines/all`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Unable to load saved headlines");
      }

      setSavedHeadlines(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Load history when the application opens
  useEffect(() => {
    loadSavedHeadlines();
  }, []);

  // Generate headlines
  function generateHeadlines() {
    if (topic.trim() === "") {
      alert("Please enter your topic!");
      return;
    }

    const results = [
      `Discover the Power of ${topic}`,
      `Everything You Need to Know About ${topic}`,
      `How ${topic} Is Changing the Future`,
      `The Ultimate Guide to ${topic}`,
      `Why Everyone Is Talking About ${topic}`
    ];

    setHeadlines(results);
  }

  // Save headline to Supabase
  async function saveHeadline(headline) {
    try {
      setSaving(headline);

      const response = await fetch(
        `${API_URL}/api/headlines/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            topic,
            category,
            tone,
            headline
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save headline");
      }

      alert("Headline saved successfully!");

      // Refresh saved headlines from database
      await loadSavedHeadlines();

    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Unable to save headline");
    } finally {
      setSaving("");
    }
  }

  return (
    <div className="app">

      <nav className="navbar">
        <h2>HeadlineCraft <span>AI</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#generator">Generator</a>
          <a href="#results">Results</a>
          <a href="#saved">Saved Headlines</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <h1>
          Create Catchy Headlines
          <span> With AI</span>
        </h1>

        <p>
          Generate creative, attractive and powerful
          headlines for your content.
        </p>
      </section>

      <section className="generator" id="generator">
        <h2>Headline Generator</h2>

        <label>Enter Your Topic</label>

        <textarea
          placeholder="Enter your topic or content..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label>Select Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Technology</option>
          <option>Education</option>
          <option>Business</option>
          <option>Entertainment</option>
          <option>Health</option>
        </select>

        <label>Select Tone</label>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option>Creative</option>
          <option>Professional</option>
          <option>Funny</option>
          <option>Catchy</option>
        </select>

        <button onClick={generateHeadlines}>
          Generate Headlines
        </button>
      </section>

      <section className="results" id="results">
        <h2>Generated Headlines</h2>

        {headlines.map((headline, index) => (
          <div className="headline-card" key={index}>
            <p>{headline}</p>

            <button
              onClick={() => navigator.clipboard.writeText(headline)}
            >
              Copy
            </button>

            <button
              onClick={() => saveHeadline(headline)}
              disabled={saving === headline}
            >
              {saving === headline ? "Saving..." : "Save"}
            </button>
          </div>
        ))}
      </section>

      <section className="results" id="saved">
        <h2>Saved Headlines</h2>

        <button
          onClick={loadSavedHeadlines}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Saved Headlines"}
        </button>

        {error && <p>{error}</p>}

        {!loading && savedHeadlines.length === 0 && (
          <p>No saved headlines yet.</p>
        )}

        {savedHeadlines.map((item) => (
          <div className="headline-card" key={item.id}>
            <p>{item.headline}</p>
            <small>
              Topic: {item.topic || item.prompt || "Not specified"}
            </small>
            <br />
            <small>Category: {item.category || "Not specified"}</small>
            <br />
            <small>Tone: {item.tone || "Not specified"}</small>
          </div>
        ))}
      </section>

      <footer>
        <p>© 2026 HeadlineCraft AI. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
