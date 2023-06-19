import { useAuth } from "../../hooks/auth";
import style from "./ModalEdit.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { getHours } from "date-fns";
import { useState } from "react";

interface IModal {
  isOpen: boolean;
  handleChangeModal: () => void;
  hour: number;
  name: string;
}

export function ModalEdit({ isOpen, handleChangeModal, hour, name }: IModal) {
  const { availableSchedules, schedules, date, handleSetDate } = useAuth();
  const [hourSchedule, setHourSchedule] = useState('');

  const todayValue = new Date().toISOString().split("T")[0];

  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date);
      const scheduleHour = getHours(scheduleDate);
      return scheduleHour === Number(hour);
    });
    console.log(
      "🚀 ~ file: index.tsx:24 ~ isScheduleAvailable ~ isScheduleAvailable:",
      isScheduleAvailable
    );
    return isScheduleAvailable;
  });

  const handleChangeHour = (hourSchedule) => {};

  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.header}>
            <h2>Editar Horario</h2>
            <AiOutlineClose onClick={handleChangeModal} />
          </div>
          <div className={style.body}>
            <p>
              {hour}h - {name}
            </p>
            <div className={style.input}>
              <label htmlFor="">Escolha uma nova data:</label>
              <input
                type="date"
                min={todayValue}
                defaultValue={todayValue}
                onChange={(e) => handleSetDate(e.target.value)}
              />
            </div>
            <div className={style.input}>
              <label htmlFor="">Selecione um novo horario</label>
              <select
                name=""
                id=""
                onChange={(e) => handleChangeHour(e.target.value)}
              >
                {filteredDate.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>
                      {hour}:00
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button>Ok</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
