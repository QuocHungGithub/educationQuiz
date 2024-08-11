import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Answer, question } from "../../services/questionService";
import { Tag } from "antd";
import "./result.scss"
function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await Answer(params.id);
      const dataQuestion = await question(dataAnswer.topicId);

      let resultFinal = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        resultFinal.push({
          ...dataQuestion[i],
          ...dataAnswer.answers.find(
            (item) => String(item.questionId) === dataQuestion[i].id
          ),
        });
      }
      setDataResult(resultFinal);
    };
    fetchApi();
  }, []);
  return (
    <>
      <h2>Kết quả:</h2>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Câu {index + 1}: {item.question}
              {item.answer === item.correctAnswer ? (
                <Tag color="green">Đúng</Tag>
              ) : (
                <Tag color="red">Sai</Tag>
              )}
            </p>
            {item.answers.map((ansItem, ansIndex) => {
              let checked = false;
              let className = "";
              if (item.answer === ansIndex) {
                checked = true;
                className = "result__item--selected";
              }
              if (item.correctAnswer === ansIndex) {
                className += "result__item--correct";
              }
              return (
                <div className="result__answer" key={ansIndex}>
                  <input
                    type="radio"
                    value={ansIndex}
                    name={item.id}
                    checked={checked}
                    disabled
                    id={`quiz-${item.id}-${ansIndex}`}
                  />
                  <label
                    htmlFor={`quiz-${item.id}-${ansIndex}`}
                    className={className}
                  >
                    {ansItem}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
export default Result;
