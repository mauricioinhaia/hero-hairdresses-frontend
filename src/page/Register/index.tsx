import style from "./Register.module.css";
import logo from "../../assets/logo.webp";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { BiUser, BiKey } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { api } from "../../server";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const schema = yup.object().shape({
    name: yup.string().required("Informe seu nome (Obrigatório)"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup
      .string()
      .min(6, "Minimo de 6 Caracteres")
      .required("Campo de senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async (data) => {
    const result = await api.post("/users", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    console.log("🚀 ~ file: index.tsx:46 ~ submit ~ result:", result

  });

  return (
    <div className={style.background}>
      <div className="container">
        <p className={style.navigate}>
          <Link to={"/"}>Home</Link> {">"} Área de Cadastro
        </p>
        <div className={style.wrapper}>
          <div className={style.imageContainer}>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2> Área de Cadastro </h2>
            <form onSubmit={submit}>
              <Input
                placeholder="Insira seu Nome"
                type="text"
                {...register("name", { required: true })}
                error={errors.name && errors.name.message}
                icon={<BiUser size={20} />}
              />
              <Input
                placeholder="Insira seu Email"
                type="text"
                {...register("email", { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20} />}
              />
              <Input
                placeholder="Crie uma Senha"
                type="password"
                {...register("password", { required: true })}
                error={errors.password && errors.password.message}
                icon={<BiKey size={20} />}
              />
              <Button text="Cadastrar" />
            </form>
            <div className={style.register}>
              <span>
                Já possui cadastro? <Link to={"/"}>Faça Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
