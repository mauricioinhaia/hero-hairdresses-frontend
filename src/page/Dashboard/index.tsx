import { useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from "./Dashboard.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";

export function Dashboard() {
  const [date, setDate] = useState(new Date());
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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
