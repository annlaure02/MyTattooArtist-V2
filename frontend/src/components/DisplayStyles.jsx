import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/DisplayStyles.css'

function DisplayStyles() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/project/api/tattoo-style/');
        const data = await response.json();
        console.log(data);
        setStyles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='custom-styles-page'>
          {styles.map((style) => (
            <div key={style.id} >
              <Card className='card-style'>
                <Card.Body>
                  <Card.Title className='card-style-title'>
                    {style.style_name}
                    </Card.Title>
                  <Card.Text className='card-style-description'>
                    <p>{style.description}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayStyles;
