import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import style from "./EditProfile.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import imageDefault from "../../assets/profile_blank.jpg";
import { FiEdit2 } from "react-icons/fi";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../server";
import { useNavigate } from "react-router-dom";

interface IFormValues {
  picture: File[];
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface IData {
  newPassword?: string;
  oldPassword?: string;
  name?: string;
  avatar_url?: File;
}

export function EditProfile() {
  const schema = yup.object().shape({
    name: yup.string(),
    newPassword: yup.string(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "As senhas devem ser iguais"),
  });

  const { register, handleSubmit, setValue } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const [fileUpload, setFileUpload] = useState(imageDefault);

  useEffect(() => {
    const userStorage = localStorage.getItem("user:semana-heroi");
    const user = userStorage && JSON.parse(userStorage);

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("picture", user.avatar_url);
  }, []);

  const submit = handleSubmit(
    async ({ name, password, newPassword, picture }: IFormValues) => {
      const data: IData = {
        name,
      };
      if (password && newPassword) {
        data.oldPassword = password;
        data.newPassword = newPassword;
      }
      if (picture) {
        data.avatar_url = picture[0];
      }
      try {
        const result = await api.put("/users/", data, {
          headers: {
            "Content-Type": "multpart/form-data",
          },
        });
        console.log("🚀 ~ file: index.tsx:70 ~ result:", result);
        console.log("🚀 ~ file: index.tsx:58 ~ data:", data);
        toast.success("Usuário atualizado com sucesso");
        navigate("/dashboard");
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
  );

  const handleImage = (files: File[]) => {
    const image = files[0];

    const imageUrl = URL.createObjectURL(image);
    setFileUpload(imageUrl);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <Header />
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          {fileUpload && (
            <div className={style.profileImage}>
              <img src={fileUpload} alt="" width={"300px"} />
              <label className={style.imageUpload}>
                <input
                  aria-hidden="true"
                  type="file"
                  {...register("picture", {
                    onChange: (e) => handleImage(e.target.files),
                  })}
                />
                <FiEdit2 />
              </label>
            </div>
          )}
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
            type="password"
            {...register("password", { required: true })}
          />
          <InputSchedule
            placeholder="Nova Senha"
            type="password"
            {...register("newPassword", { required: true })}
          />
          <InputSchedule
            placeholder="Confirmar Senha"
            type="password"
            {...register("confirmNewPassword", { required: true })}
          />
          <div className={style.footer}>
            <button onClick={handleCancel}>Cancelar</button>
            <button>Ok</button>
          </div>
        </form>
      </div>
    </div>
  );
} //2h02
