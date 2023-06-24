import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import style from "./EditProfile.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormValues {
  picture: File[];
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function EditProfile() {
  const schema = yup.object().shape({
    name: yup.string(),
    newPassword: yup.string(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "As senhas devem ser iguais"),
  });

  const { register, handleSubmit } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit((data) => {});

  return (
    <div className="container">
      <Header />
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <input type="file" {...register("picture")} />
          <InputSchedule
            placeholder="Nome"
            type="text"
            {...register("name", { required: true })}
          />
          <InputSchedule
            placeholder="Email"
            type="text"
            {...register("email", { required: true })}
          />
          <InputSchedule
            placeholder="Senha Atual"
            type="text"
            {...register("password", { required: true })}
          />
          <InputSchedule
            placeholder="Nova Senha"
            type="text"
            {...register("newPassword", { required: true })}
          />
          <InputSchedule
            placeholder="Confirmar Senha"
            type="text"
            {...register("confirmNewPassword", { required: true })}
          />
          <div className={style.footer}>
            <button>Cancelar</button>
            <button>Ok</button>
          </div>
        </form>
      </div>
    </div>
  );
}
