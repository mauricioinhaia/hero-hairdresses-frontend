import style from "./Login.module.css";
import logo from "../../assets/logo.webp";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { BiKey } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { useAuth } from "../../hooks/auth";

interface IFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup.string().required("Campo de Senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ email, password }) => {
    try {
      signIn({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:44 ~ submit ~ error:", error)
      
    }

    // navigate("/dashboard");
  });

  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <div>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2> Olá, seja Bem Vindo! </h2>
            <form onSubmit={submit}>
              <Input
                placeholder="Email"
                type="text"
                {...register("email", { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20} />}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register("password", { required: true })}
                error={errors.password && errors.password.message}
                icon={<BiKey size={20} />}
              />
              <Button text="Entrar" />
            </form>
            <div className={style.register}>
              <span>
                Ainda não tem conta? <Link to={"/register"}>Cadastre-se</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
