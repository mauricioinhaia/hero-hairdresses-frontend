import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from "./Dashboard.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../server";

interface ISchedule {
  name: string;
  phone: string;
  date: Date;
  id: string;
}

export function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
  const { user } = useAuth();

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleDataChange = (date: Date) => {
    return setDate(date);
  };

  useEffect(() => {
    api
      .get("/schedules", { params: { date } })
      .then((response) => {
        console.log("🚀 ~ file: index.tsx:32 ~ api.post ~ response:", response);
        setSchedules(response.data);
      })
      .catch((error) => {
        console.log("🚀 ~ file: index.tsx:34 ~ api.post ~ error:", error);
      });
  }, [date]);

  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Olá, {user.name}!</h2>
        <p>
          Esta é a sua lista de horários
          {isToday(date) && <span> de hoje, </span>}
          {!isToday(date) && <span> para </span>}
          {format(date, "dd/MM/yy")}
        </p>
      </div>
      <h2 className={style.nextSchedules}> Próximos Horários </h2>
      <div className={style.schedule}>
        <div className={style.cardWrapper}>
          {schedules.map((schedule, index) => {
            return (
              <Card
                key={index}
                date={schedule.date}
                name={schedule.name}
                id={schedule.id}
                phone={schedule.phone}
              />
            );
          })}
        </div>
        <div className={style.picker}>
          <DayPicker
            className={style.calendar}
            classNames={{
              day: style.day,
            }}
            selected={date}
            modifiers={{ available: isWeekDay }}
            mode="single"
            modifiersClassNames={{
              selected: style.selected,
              today: style.today,
            }}
            fromMonth={new Date()}
            locale={ptBR}
            disabled={isWeekend}
            onDayClick={handleDataChange}
          />
        </div>
      </div>
    </div>
  );
}
