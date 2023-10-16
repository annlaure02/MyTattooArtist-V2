import React from 'react'
import Card from 'react-bootstrap/Card';
import InfoPhoto from '../images/Info-photo2.jpg'
import '../styles/CardHomeInfo.css'

function CardHomeInfo() {
  return (
    <>
      <div>
        <Card className='card-home-info'>
          <Card.Img className='card-home-info-img' variant="top" src={InfoPhoto} />
          <Card.Body className='card-home-info-body'>
            <Card.Title className='card-home-info-title'>Infos</Card.Title>
            <div className='card-home-info-text'>
              <h3>Comment choisir son tatoueur</h3>
              <div>
                <p>Choisir le bon tatoueur est essentiel pour garantir un tatouage de qualité.
                  <br />
                  Pour commencer, faites des recherches et consultez les portfolios en ligne des tatoueurs
                  pour trouver celui dont le style correspond à vos attentes. Vérifiez leur expérience et spécialités.
                  <br />
                  Après en avoir séléctionner quelques uns, visitez leurs studios pour vous assurer de
                  leur propreté et de leur organisation.
                  Planifiez une consultation avec le tatoueur pour discuter de votre projet et de vos attentes.
                  <br />
                  Choisissez un tatoueur avec qui vous vous sentez à l'aise.
                  <br />
                </p>
              </div>
              <h3>Prendre soin de son tatouage, c'est important!</h3>
              <div>
                <h6>Après avoir fait votre tatouage, suivez ces étapes simples pour en prendre soin :</h6>
                <ul>
                  <li>Laissez le pansement pendant quelques heures pour protéger la zone.</li>
                  <li>Nettoyez délicatement avec de l'eau tiède et du savon doux.</li>
                  <li>Séchez en tapotant avec une serviette propre.</li>
                  <li>Durant 10 à 15 jours, appliquez régulièrement une pommade (exemple: Bépanthène) pour hydrater la peau.</li>
                  <li>Évitez les irritations comme les vêtements serrés et l'exposition au soleil.</li>
                  <li>Ne grattez pas ou ne pelez pas la peau qui pèle, laissez-la guérir naturellement.</li>
                </ul>
                <h6>Pour prendre soin de votre tatouage sur le long terme :</h6>
                <ul>
                  <li>Hydratez régulièrement avec une crème spécifique pour les tatouages.</li>
                  <li>Protégez du soleil en utilisant une crème solaire et en limitant l'exposition directe.</li>
                  <li>Évitez les produits agressifs et préférez ceux formulés pour les tatouages.</li>
                  <li>Maintenez une peau saine en adoptant une bonne hygiène de vie.</li>
                  <li>Évitez les traumatismes et les frottements excessifs.</li>
                  <li>Suivez les conseils de votre tatoueur pour un entretien optimal.</li>
                </ul>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default CardHomeInfo
