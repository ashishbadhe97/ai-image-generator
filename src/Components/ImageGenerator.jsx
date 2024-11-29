import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default-image.png";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const getImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true);
    let data = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });

    if (!data.ok) {
      setImageUrl("/");
      setLoading(false);
      return;
    }

    let image = await data.json();

    setImageUrl(image);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>

      <div className="image">
        <img src={imageUrl === "/" ? default_image : imageUrl} alt="default-image" />
      </div>

      <div className="loading">
        <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        <div className={loading ? "display-text" : "display-none"}>Loading...</div>
      </div>

      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="input-box"
          placeholder="Enter what you want to see"
        />
        <button className="generate-btn" onClick={() => getImage()}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
