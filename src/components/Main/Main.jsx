import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <div>
            <div className="greet">
              <p>
                <span>Hello, Dev...</span>
              </p>
              <p>How can I assist you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Discover hidden gems for your next adventure!</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Unravel the mysteries of Artificial Intelligence.</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Start a friendly chat and ask me anything!</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Need help with code? Let’s build something awesome!</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultData">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading?<div className="loader">
                <hr />
                <hr />
                <hr />
                </div>:
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyPress={(e) => {
                if (e.key === "Enter") onSent();
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />

             {input?<img src={assets.send_icon} alt="" onClick={onSent} />:null}
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check important
            details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
