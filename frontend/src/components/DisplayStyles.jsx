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
        const sortedStyles = data.sort((a, b) => a.style_name.localeCompare(b.style_name));
        setStyles(sortedStyles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='custom-styles-page'>
        {styles.map((style) => (
          <div key={style.id} >
            <Card className='custom-card display-styles'>
              <Card.Body>
                <Card.Title className='card-title display-styles'>
                  {style.style_name}
                </Card.Title>
                <Card.Text className='card-description display-styles'>
                  <p>{style.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayStyles;
