import { Table } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAnswerByUserId } from "../../services/answerService";
import { TopicList } from "../../services/topicService";
function Answer() {
  const [dataAnswers, setDataAnswers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const answerByUserId = await getAnswerByUserId();
      const topics = await TopicList();
      let result = [];
      for (let i = 0; i < answerByUserId.length; i++) {
        result.push({
          ...topics.find((item) => item.id === String(answerByUserId[i].topicId)),
          ...answerByUserId[i],
        });
      }
     
      setDataAnswers(result.reverse())
     
    };
    fetchApi();
  }, []);
  
  const columns = [
      {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          render: (_, record) => {
              return (
                  <>{record.id}</>
              )
          }
      },
      {
          title: 'Tên chủ đề',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => {
              return (
                  <>{record.name}</>
              )
          }
      },
      {
          title: '',
          dataIndex: 'action',
          key: 'action',
          render: (_, record) => {
              return (
                  <><Link to={"/result/" + record.id}>Xem chi tiết</Link></>
              )
          }
      },
  ];
  return (
    <>
      <>
        <h2>Danh sách bài đã tập luyện</h2>
        <Table columns={columns} dataSource={dataAnswers} rowKey="id" />
      </>
    </>
  );
}
export default Answer;
