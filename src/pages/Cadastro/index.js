import React, { useState } from 'react';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Title, Paragrafo } from './styled';

export default function Cadastro() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherDayIcon, setWeatherDayIcon] = useState('');
  const [descricao, setDescricao] = useState('');

  async function getCity() {
    await axios
      .get(
        `/locations/v1/cities/search?q=${city
          .normalize('NFD')
          .replace(/[^a-zA-Z]/g, '')
          .toLowerCase()}&apikey=JzCVtqJCHC3D37L21zR2wgpiQAgbgZjT`
      )
      .then((resp) => {
        axios
          .get(
            `/currentconditions/v1/${resp.data[0].Key}?&apikey=JzCVtqJCHC3D37L21zR2wgpiQAgbgZjT&language=pt-br`
          )
          .then((response) => {
            setTemperature(response.data[0].Temperature.Metric.Value);
            setDescricao(response.data[0].WeatherText);
            if (response.data[0].WeatherIcon.toString().length < 2) {
              setWeatherIcon(`0${response.data[0].WeatherIcon}`);
            } else {
              setWeatherIcon(response.data[0].WeatherIcon);
            }
            if (response.data[0].IsDayTime) {
              setWeatherDayIcon('01');
            } else {
              setWeatherDayIcon('33');
            }
          });
      });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getCity();
    }
  };

  return (
    <Container>
      <Title>Temperatura e Meteorológia</Title>
      <Paragrafo className="lead">Digite o nome da Cidade:</Paragrafo>
      {/* <button type="button">Enviar</button> */}
      <div className="">

      </div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-control"
      />
      <div className="mt-4">
        <Paragrafo>Temperatura: {temperature}C°</Paragrafo>
        <Paragrafo>Como está o céu: {descricao}</Paragrafo>
        {weatherIcon ? (
        <img
          src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
          width="75"
          height="45"
          alt="icon"
          title={descricao}
        />
        ) : null}
      </div>

      { weatherDayIcon ? (weatherDayIcon == '01' ? (<Paragrafo>Está de dia</Paragrafo>) : (<Paragrafo>Está de Noite</Paragrafo>)) : null}
      {weatherDayIcon ? (
        <img
          src={`https://developer.accuweather.com/sites/default/files/${weatherDayIcon}-s.png`}
          width="75"
          height="45"
          alt="icon"
          title="dia ou noite"
        />
      ) : null}

    </Container>
  );
}
