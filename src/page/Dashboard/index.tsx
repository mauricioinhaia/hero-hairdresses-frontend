import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from "./Dashboard.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Olá, {user.name}!</h2>
        <p>Esta é a sua lista de horários de hoje, 15/06/2023.</p>
      </div>
      <h2> Próximos Horários </h2>
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
          <DayPicker />
        </div>
      </div>
    </div>
  );
}
