import style from "./Login.module.css";
import logo from "../../assets/logo.webp";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormValues {
  email: string;
  password: string;
}

export function Login() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup.string().required("Campo de email obrigatório"),
  });

  const { register, handleSubmit, formState: {errors} } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit((data) => {
    console.log("🚀 ~ file: index.tsx:27 ~ submit ~ data:", data);
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
                error = {errors.email && errors.email.message}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register("password", { required: true })}
              />
              <button>Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
