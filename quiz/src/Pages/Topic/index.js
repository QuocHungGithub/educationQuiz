import { Table } from "antd"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopicList } from "../../services/topicService";
// import { Link } from "react-router-dom";
import './topic.scss'

function Topic() {
  const [topic, setTopic] = useState([])
   const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const request = await TopicList();
      setTopic(request);
    };
    fetchApi()
  }, []);
  const handleClick = (id) => {
    navigate(`/quiz/${id}`); 
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return <>{record.id}</>
      },
    },
    {
      title: "Tên Chủ Đề",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return <>{record.name}</>
      },
    },
    {
      title: "Đề Làm Bài",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <button 
          className="button-quiz"
          onClick={() => handleClick(record.id)}
        >
          Làm Bài
        </button>
        )
      },
    },
  ]
  return (
    <>
      <h2>Danh sách chủ đề</h2>
      <Table columns={columns} dataSource={topic} rowKey="id" />
    </>
  )
}
export default Topic;
