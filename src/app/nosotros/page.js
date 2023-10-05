'use client';
import useDeviceSize from '@/hooks/useDeviceSize';

function Nosotros() {
  const [windowWidth, windowHeight] = useDeviceSize();

  const spanStyle = {
    fontFamily: 'Stretch-pro',
    fontSize: windowWidth < 755 && windowWidth >= 375 ? '32px' : windowWidth < 375 ? '24px' : '48px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  };
  const spanHeight = windowWidth < 503 && windowWidth >= 375 ? 'h-32' : windowWidth < 375 ? 'h-24' : 'h-16';
  const highlightedText = {
    color: '#ED6E2F',
    fontWeight: '700'
  }

  return (
    <div className="bg-fomo-sec-white flex flex-col justify-center items-center">
      <div className={`mt-8 bg-fomo-pri-two w-3/4 max-w-3xl text-center shadow-md flex justify-center items-center ${spanHeight}`}>
        <span style={spanStyle}>
          ¿Qué es FOMO?
        </span>
      </div>
      <div className="mt-4 text-black w-5/6 max-w-4xl">
        <p className='mt-8'>FOMO viene de la sigla en inglés <span style={highlightedText}>Fear of missing out</span>, cuya traducción al castellano es “miedo a perderse algo”. Somos amigxs que nos unen las ganas de hacer cosas todo el tiempo.</p>
        <p className='mt-8'>En GRUPO FOMO somos trabajadores de distintas disciplinas artísticas y creamos una agenda en donde <span style={highlightedText}>difundimos los eventos</span> que ocurren en la ciudad para que no te pierdas nada.</p>
        <p className='mt-8'>También somos una <span style={highlightedText}>productora de stream</span>, donde hoy contamos con dos programas Fomo.stream y Vamos Viendo. Dos propuestas con ganas de jugar, de aprender y divulgar información acerca de la cultura marplatense. </p>
        <p className='mt-8'>Grupo FOMO: un grupo de curiosxs trabajadores del arte y la cultura.</p>
      </div>
      <div className="mt-8 mb-16 text-black w-5/6 max-w-4xl">
        <img src="https://i.ibb.co/T0VBpYC/Whats-App-Image-2023-09-15-at-17-54-30.jpg"/>
      </div>
    </div>
  );
}

export default Nosotros;