import { Card } from "antd";
import React from "react";

export default function NoteCard({ data, index }) {
  return (
    <Card>
      <div style={{ fontSize: "16px", fontWeight: 400, color: "darkgray" }}>
        {data.sign}
      </div>
      <div style={{ fontSize: "20px", fontWeight: 500 }}>Запись №{index}</div>
      <div style={{ fontSize: "18px", fontWeight: 400, color: "darkgray" }}>
        {data.date}
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: 400,
          color: "darkgray",
          marginTop: "14px",
        }}
      >
        {data.text}
      </div>
    </Card>
  );
}
