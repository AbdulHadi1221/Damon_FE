import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import "./QRCodeGenerator.css";
import { BaseUrl } from "../shared/BaseUrl";
import { useSelector } from "react-redux";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrText, setQrText] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/api/qrcode/qrcode`,
        { text }, // Payload
        { headers: { Authorization: `Bearer ${token}` } } // Headers with Authorization
      );
      console.log({ response });
      setQRCodeURL(response.data.qrCodeURL);
      setQrText(response.data.text);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="qr-code-generator-container">
      <div className="generator-containers">
        <input
          style={{
            borderRadius: "2rem",
            border: "2px solid rgb(243, 181, 98)",
          }}
          className="qr-code-generator-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="qr-code-generator-button" onClick={handleGenerate}>
          Generate QR Code
        </button>
        {qrCodeURL && (
          <div className="qr-code-image-container">
            {<QRCode className="qr-code" value={qrText} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
