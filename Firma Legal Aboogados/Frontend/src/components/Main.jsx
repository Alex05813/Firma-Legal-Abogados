import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules'; // Import the required modules

const Main = () => {
  return (
    <main>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        modules={[Navigation, EffectCoverflow]} 
        coverflowEffect={{
          depth: 500,
          modifier: 1,
          slideShadows: true,
          rotate: 0,
          stretch: 0,
        }}
        navigation
      >
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Suceciones</h3>
              <p>
                Brindamos acompañamiento legal en la distribución de herencias, asegurando que el proceso se
                realice de forma justa y conforme a la ley, protegiendo los derechos de todos los herederos.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/1.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Divorcios y Liquidaciones</h3>
              <p>
                Te asistimos en todo el proceso de divorcio, desde la separación hasta la liquidación de
                bienes, garantizando un enfoque respetuoso y eficiente para ambas partes.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Preliquidaciones Notariales</h3>
              <p>
              Ofrecemos asesoría y gestión en la preliquidación de bienes, evitando conflictos legales
              futuros y asegurando que los procesos de sucesión y liquidación sean claros.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Salidas del Pais</h3>
              <p>
              Asesoramos en la obtención de permisos legales para la salida de menores o adultos,
              cumpliendo con todos los requisitos exigidos por las autoridades.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Matrimonios</h3>
              <p>
              Gestionamos la formalización legal de matrimonios, tanto en el territorio nacional como en
              el extranjero, asegurando la validez de tu unión en cualquier jurisdicción.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Contratos</h3>
              <p>
              Redactamos y revisamos contratos ajustados a tus necesidades específicas, garantizando la
              protección de tus derechos e intereses en cualquier tipo de transacción.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Derechos de Peticion</h3>
              <p>
              Facilitamos la redacción y presentación de derechos de petición, asegurando que tus
              solicitudes ante entidades públicas sean claras y efectivas.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Tutelas</h3>
              <p>
              Defendemos tus derechos fundamentales a través de acciones de tutela, asegurando que recibas
              la protección judicial que te corresponde según la Constitución.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Derecho Canonico</h3>
              <p>
              Te orientamos en procesos legales eclesiásticos, como nulidades matrimoniales y otros
              asuntos regulados por el derecho de la Iglesia.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Nulidades de Matrimonio</h3>
              <p>
              Si buscas anular un matrimonio, te ofrecemos asistencia legal completa, asegurando que el
              proceso sea rápido y cumpla con los requisitos legales.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Licencias Desenglobes</h3>
              <p>
              Asesoramos en la división de propiedades, garantizando que cada nueva fracción esté
              legalmente constituida y cumpla con los requisitos de registro.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>Englobes</h3>
              <p>
              Te ayudamos a fusionar propiedades en un solo lote de manera legal, agilizando el proceso y
              evitando futuros inconvenientes registrales.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
        <SwiperSlide>
          <div className="icons">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </div>
          <div className="proceso-content">
            <div className="proceso-txt">
              <h3>RPH</h3>
              <p>
              Expertos en la constitución y administración del Régimen de Propiedad Horizontal, brindamos
              asesoría integral para garantizar una gestión eficiente.
              </p>
            </div>
            <div className="proceso-img">
              <img src="../src/assets/img/2.jpg" alt="" />
            </div>
          </div>
          <a href="#" className="btn-1">Saber Más</a>
        </SwiperSlide>
      </Swiper>
      
      <section id="noticias" className="noticias-container">
        <h2 className="titulo-seccion">Noticias Recientes</h2>
        <div className="tarjeta-noticia">
          <img src="../src/assets/img/noticia1.webp" alt="Noticia 1" className="imagen-noticia" />
          <div className="contenido-noticia">
            <h3 className="titulo-noticia">Título de la noticia 1</h3>
            <p className="descripcion-noticia">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi id dolores tenetur consequuntur
              debitis quaerat. Illum pariatur, labore sed quam necessitatibus velit omnis iure repellat.
            </p>
            <a href="#" className="boton-leer-mas">Leer más</a>
          </div>
        </div>
        <div className="tarjeta-noticia">
          <img src="../src/assets/img/noticia1.webp" alt="Noticia 2" className="imagen-noticia" />
          <div className="contenido-noticia">
            <h3 className="titulo-noticia">Título de la noticia 2</h3>
            <p className="descripcion-noticia">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatum dignissimos architecto
              aperiam, exercitationem eius nostrum? Eius placeat numquam mollitia veritatis! Placeat porro
              mollitia impedit!
            </p>
            <a href="#" className="boton-leer-mas">Leer más</a>
          </div>
        </div>
      </section>

      <div className="nuestro-equipo">
        <h1><br />NUESTRO EQUIPO</h1>
      </div>
      <div className="abogados">
        <div className="abogado-box">
          <div className="nombre-abogado">
            <img src="../src/assets/img/Abogado1.png" alt="Foto de perfil" />
            <h3>OSCAR JARAMILLO</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, eveniet maxime itaque cumque voluptates
            dolores sint odit illo esse sunt, nostrum tenetur, pariatur libero officiis. Officiis impedit quis est,
            harum consequuntur optio cupiditate laudantium iusto exercitationem totam! Deserunt, libero recusandae
            consequuntur, perspiciatis aliquam nobis quibusdam illo porro iure dolorem sunt.
          </p>
        </div>
        <div className="abogado-box">
          <div className="nombre-abogado">
            <img src="../src/assets/img/Abogado2.png" alt="Foto de perfil" />
            <h3>JENNIFER BRICEÑO</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illo, autem enim ullam facere
            laboriosam harum maiores, minus magnam doloribus iure similique beatae voluptates necessitatibus omnis,
            velit nobis quaerat quia. Cumque voluptatum iste maiores minima aliquam culpa autem! Totam earum maiores
            quisquam, magnam nulla nemo adipisci ratione atque sunt rem!
          </p>
        </div>
        <br />
      </div>
      <br />
    </main>
  );
};

export default Main;




