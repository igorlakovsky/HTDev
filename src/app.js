import { Button, Col, Form, Input, Pagination, Row, Select, Tabs } from "antd";

import NoteCard from "./components/NoteCard";
import React from "react";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function App() {
  //   const data = {
  //     text: String,
  //     sign: String,
  //     tz: String,
  //     date: Record<string,any>,
  //   };

  const dispatch = useDispatch();

  const data = [
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
  ];

  return (
    <Row justify="center" style={{ paddingTop: "30px" }}>
      <Col span={20}>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Создать запись" key="1">
            <Form
              name="textarea"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              requiredMark={false}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
            >
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    label={<div style={{ fontSize: "16px" }}>Запись</div>}
                    name="text"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label={<div style={{ fontSize: "16px" }}>Подпись</div>}
                    name="sign"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input maxLength={100} size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={
                      <div style={{ fontSize: "16px" }}>Точное время по</div>
                    }
                    name="tz"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Select size="large" />
                  </Form.Item>
                </Col>
                <Col span={6} offset={18}>
                  <Form.Item>
                    <Button
                      type="primary"
                      block
                      size="large"
                      onClick={() => {
                        dispatch({ type: "noteCard/increment" });
                      }}
                    >
                      Создать
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="Записи" key="2">
            <Row gutter={[16, 16]}>
              {data.map((value, index) => {
                return (
                  <Col span={12} key={index}>
                    <NoteCard data={value} index={index + 1} />
                  </Col>
                );
              })}
            </Row>
            <div style={{ textAlign: "center" }}>
              <Pagination
                size="small"
                defaultCurrent={1}
                total={50}
                style={{ margin: "15px 0px 40px 0px" }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}
