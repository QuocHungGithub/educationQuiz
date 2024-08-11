import { Row, Col, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { checkExits, register } from "../../services/usersService";
import "./Register.scss"
function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const fullName = e.fullName;
    const email = e.email;
    const password = e.password;
    const checkExitsEmaill = await checkExits("email", email);
    if (checkExitsEmaill.length > 0) {
      messageApi.open({
        type: "error",
        content: "Email đã tồn tại",
      });
    } else {
      const data = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };
      const response = await register(data);
      if (response) {
        messageApi.open({
          type: "error",
          content: "Đăng ký thành công",
        });
        navigate("/login");
      } else {
        messageApi.open({
          type: "error",
          content: "Đăng ký không thành công",
        });
      }
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
      {contextHolder}
      <Row className="register">
        <Col span={8} offset={8} className="register__container">
          <h3 className="register__heading">Đăng Ký</h3>
          <Form
            className="register__form"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={rules}
              className="register__form-item"
            >
              <Input className="register__input" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={rules}
              className="register__form-item"
            >
              <Input className="register__input" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={rules}
              className="register__form-item"
            >
              <Input.Password className="register__input" />
            </Form.Item>
            <Form.Item className="register__form-item">
              <Button
                type="primary"
                htmlType="submit"
                className="register__button"
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default Register;
