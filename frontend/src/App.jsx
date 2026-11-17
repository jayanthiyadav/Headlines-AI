import { useState } from "react";
import "./App.css";

function App() {

  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tone, setTone] = useState("Creative");
  const [headlines, setHeadlines] = useState([]);

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

  return (
    <div className="app">

      <nav className="navbar">
        <h2>HeadlineCraft <span>AI</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#generator">Generator</a>
          <a href="#results">Results</a>
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