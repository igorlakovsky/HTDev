import * as React from "react";

import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Tabs,
  message,
} from "antd";
import {
  addNote,
  getTimezone,
  selectCurrentNoteStatus,
  selectNotes,
  selectTimezone,
  selectTimezoneStatus,
} from "./components/noteCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "./app/store";
import NoteCard from "./components/NoteCard";
import { getStorageNotesCount } from "./app/localStorage";

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function App() {
  const notesData = useSelector(selectNotes);
  const timezone = useSelector(selectTimezone);
  const timezoneStatus = useSelector(selectTimezoneStatus);
  const currentNoteStatus = useSelector(selectCurrentNoteStatus);

  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getTimezone());
  }, []);

  useEffect(() => {
    if (currentNoteStatus === "succeeded") {
      message.success("Запись сохранена");
      form.setFieldValue("text", "");
    }
    if (currentNoteStatus === "failed") {
      message.error("Произошла ошибка");
    }
  }, [currentNoteStatus]);

  return (
    <Row justify="center" style={{ paddingTop: "30px" }}>
      <Col span={20}>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Создать запись" key="1">
            <Form
              form={form}
              name="textarea"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              requiredMark={false}
            >
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    label={<div style={{ fontSize: "16px" }}>Запись</div>}
                    name="text"
                    rules={[
                      {
                        required: true,
                        message: "Введите текст записи!",
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
                        message: "Введите подпись автора!",
                      },
                    ]}
                    initialValue={localStorage.getItem("currentSign")}
                  >
                    <Input
                      maxLength={100}
                      size="large"
                      onChange={(e) => {
                        localStorage.setItem("currentSign", e.target.value);
                      }}
                    />
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
                        message: "Выберете часовой пояс!",
                      },
                    ]}
                    initialValue={localStorage.getItem("currentTimezone")}
                  >
                    <Select
                      size="large"
                      disabled={timezoneStatus !== "succeeded"}
                      onSelect={(timezone: string) => {
                        localStorage.setItem("currentTimezone", timezone);
                      }}
                    >
                      {timezone.map((value: string, index: number) => {
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
                      loading={currentNoteStatus == "loading"}
                      onClick={() => {
                        form
                          .validateFields()
                          .then(() => {
                            dispatch(addNote(form.getFieldsValue()));
                          })
                          .catch(() => {});
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
                if ((pageNumber - 1) * 10 <= index && index < pageNumber * 10) {
                  // Ну и придумал конечно))
                  return (
                    <Col span={12} key={index}>
                      <NoteCard data={value} index={index + 1} />
                    </Col>
                  );
                }
              })}
            </Row>
            <div style={{ textAlign: "center" }}>
              <Pagination
                size="small"
                defaultCurrent={1}
                total={getStorageNotesCount()}
                pageSize={10}
                style={{ margin: "15px 0px 40px 0px" }}
                onChange={(page) => {
                  setPageNumber(page);
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}
