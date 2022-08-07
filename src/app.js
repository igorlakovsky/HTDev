import { Button, Col, Form, Input, Pagination, Row, Select, Tabs } from "antd";
import React, { useEffect } from "react";
import {
  cardAdded,
  getNotes,
  selectNotes,
  selectTimezone,
  selectTimezoneStatus,
} from "./components/noteCardSlice";
import { useDispatch, useSelector } from "react-redux";

import NoteCard from "./components/NoteCard";

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function App() {
  const notesData = useSelector(selectNotes);
  const timezone = useSelector(selectTimezone);
  const timezoneStatus = useSelector(selectTimezoneStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

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
                    <Select
                      size="large"
                      disabled={timezoneStatus !== "succeeded"}
                    >
                      {timezone.map((value, index) => {
                        return (
                          <Option value={value} key={index}>
                            {value}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} offset={18}>
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      size="large"
                      disabled={timezoneStatus !== "succeeded"}
                      onClick={() => {
                        // dispatch(getNotes());
                        // dispatch(
                        //   cardAdded({
                        //     text: "Текст записи",
                        //     sign: "Подпись автора",
                        //     tz: "",
                        //     date: "2022-10-02.2342-344232-5345345-UTF",
                        //   })
                        // );
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
              {notesData.map((value, index) => {
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
