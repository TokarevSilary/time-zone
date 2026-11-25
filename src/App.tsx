import { useEffect, useState } from 'react'
import WorldClockList from './components/WorldClockList'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [city, setCity] = useState<string>("");
  const [timezone, setTimezone] = useState<number>();
  const [data, setData] = useState<Array<{ id: string; city: string; cityTime: number }>>([]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    const validate = /^-(12|1[01]|[0-9])(\.5)?$|^(0|[1-9]|1[0-4])(\.5)?$/;
    const validateName = /^[а-яёa-z]+(?:[ -][а-яёa-z]+)*$/i;
    const timezoneInput = e.currentTarget.elements.namedItem("timezone") as HTMLInputElement;
    const cityInput = e.currentTarget.elements.namedItem("city") as HTMLInputElement;

    const formData = new FormData(e.currentTarget);
    if (!validate.test(String(formData.get("timezone"))))  {
        timezoneInput.setCustomValidity("Введите корректную временную зону от -12 до +14 с шагом 0.5");
        timezoneInput.reportValidity();
      return;
    }
    if (!validateName.test(String(formData.get("city"))))  {
        cityInput.setCustomValidity("Введите корректное название города");
        cityInput.reportValidity();
      return;
    }
    const city = formData.get("city") as string;
    const timezone = Number(formData.get("timezone"));
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = utc + timezone * 3600000;

    setData([...data, { city, cityTime, id: uuidv4() }]);
    setCity("");
    setTimezone(0);
  };

    const changeTimezone = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.setCustomValidity("");
      const validate = /^-(12|1[01]|[0-9])(\.5)?$|^(0|[1-9]|1[0-4])(\.5)?$/;

      const value = e.currentTarget.value;
      if (!validate.test(value)) return;
      setTimezone(Number(value));
  };

      const changeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.setCustomValidity("");
      const value = e.currentTarget.value;
      setCity(String(value));
  };

  const deleteClock = (id: string) => {
  setData(data.filter(item => item.id !== id));
};

useEffect(() => {
    const interval = setInterval(() => {
        setData((prevData) =>
            prevData.map((inform) => ({
                ...inform,
                cityTime: inform.cityTime + 1000,
            }))
        );
    }, 1000);

    return () => clearInterval(interval);
}, []);

  return (
    <>
    <form className="container-input" onSubmit={submit}>
      <h3 className="input-name city-label">Название</h3>
      <h3 className="input-name timezone-label">Временная зона</h3>
      <input value={city} onChange={changeCity} name="city" type="text" className="input-city" placeholder="Введите название города" required />
      <input value={timezone} onChange={changeTimezone} name="timezone" type="text" className="input-timezone" placeholder="Введите временную зону" required />
      <button type="submit" className="submit-button">Добавить</button>
    </form>
      <WorldClockList data={data}  onDelete={deleteClock} />
    
    </>
  )
}

export default App
