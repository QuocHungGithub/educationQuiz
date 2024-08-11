import { Button, Col, Form, Input, Row, message } from "antd";
import { login } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../Actions/login";
import './login.scss'

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    const email = e.email;
    const password = e.password;
    const response = await login(email, password);
    if (response.length > 0) {
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      navigate("/");
      dispatch(checkLogin(true));
    } else {
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại",
      });
    }
  };
  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  return (
    <>
      <>
        {contextHolder}
        <Row>
          <Col span={8} offset={8}>
            <h3 className="login-form__heading">Đăng Nhập</h3>
            <Form
              className="login-form"
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item label="Email" name="email" rules={rules}>
                <Input className="login-form__input" />
              </Form.Item>
              <Form.Item label="Mật khẩu" name="password" rules={rules}>
                <Input.Password className="login-form__input" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form__button"
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    </>
  );
}
export default Login;
