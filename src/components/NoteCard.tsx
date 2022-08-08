import * as React from "react";

import { Card } from "antd";

type AppProps = {
  data: { text: string; sign: string; tz: string; date: string };
  index: number;
};

export default function NoteCard({ data, index }: AppProps) {
  return (
    <Card>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 400,
          color: "darkgray",
          overflow: "hidden",
        }}
      >
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
          height: "1.25em",
          lineHeight: 1.25,
          overflow: "hidden",
        }}
      >
        {data.text}
      </div>
    </Card>
  );
}
