import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Topic } from "../../services/topicService";
import { question } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
import "./quiz.scss";

function Quiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestion, setDataQuestion] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await Topic(params.id);
      setDataTopic(result);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await question(params.id);
      setDataQuestion(result);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        console.log(name, value);
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
    }
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };
    const result = await createAnswer(options);
    if (result) {
      navigate(`/result/${result.id}`);
    }
  };
  return (
    <>
      <h2>Bài Quiz Chủ đề: {dataTopic && <>{dataTopic.name}</>}</h2>
      <div className="quiz__form">
        <form onSubmit={handleSubmit} className="quiz__form--one">
          {dataQuestion.map((item, index) => (
            <div className="quiz__form--item" key={item.id}>
              <p className="quiz__form--question">
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="quiz__form--answer" key={indexAns}>
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAns}
                    id={`quiz-${item.id}-${indexAns}`}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                    {itemAns}
                  </label>
                </div> 
              ))}
            </div>
          ))}

          <button className="quiz__form--submit" type="submit">
            Nộp bài
          </button>
        </form>
      </div>
    </>
  );
}
export default Quiz;
