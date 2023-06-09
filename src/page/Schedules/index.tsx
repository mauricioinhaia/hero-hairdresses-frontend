import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import style from "./Schedules.module.css";
import { useAuth } from "../../hooks/auth";
import { formatISO, getHours, parseISO, setHours } from "date-fns";
import { api } from "../../server";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormValues {
  name: string;
  phone: string;
  date: string;
  hour: string;
}

export function Schedules() {
  const schema = yup.object().shape({
    name: yup.string().required("Campo de nome obrigatorio"),
    phone: yup.string().required("Campo de telefone obrigatorio"),
    date: yup.string().required("Campo de data obrigatorio"),
    hour: yup.string().required("Campo de hora obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const { availableSchedules, schedules, handleSetDate } = useAuth();

  const navigate = useNavigate();
  const currentValue = new Date().toISOString().split("T")[0];

  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date);
      const scheduleHour = getHours(scheduleDate);
      return scheduleHour === Number(hour);
    });
    return isScheduleAvailable;
  });

  const submit = handleSubmit(async ({ name, phone, date, hour }) => {
    const formattedDate = formatISO(setHours(parseISO(date), parseInt(hour)));
    try {
      await api.post(`/schedules/`, {
        name,
        phone,
        date: formattedDate,
        hour,
      });
      toast.success("Agendamento feito com sucesso");
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  const handleCancel = () => {
    navigate("/dashboard");
  };
  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>Agendamento de Horário</h2>
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <InputSchedule
            placeholder="Nome do Cliente"
            type="text"
            {...register("name", { required: true })}
            error={errors.name && errors.name.message}
          />
          <InputSchedule
            placeholder="Fone"
            type="text"
            {...register("phone", { required: true })}
            error={errors.phone && errors.phone.message}
          />
          <div className={style.date}>
            <InputSchedule
              placeholder="Data"
              type="date"
              {...register("date", {
                required: true,
                value: currentValue,
                onChange: (e) => handleSetDate(e.target.value),
              })}
              error={errors.date && errors.date.message}
            />
            <div className={style.select}>
              <label htmlFor="">Hora</label>
              <select
                {...register("hour", {
                  required: true,
                })}
              >
                {filteredDate.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>
                      {hour}:00
                    </option>
                  );
                })}
              </select>
              {errors.hour && <span>{errors.hour.message}</span>}
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleCancel}>Cancelar</button>
            <button>Ok</button>
          </div>
        </form>
      </div>
    </div>
  );
}
