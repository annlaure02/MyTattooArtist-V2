import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/Display.css'

function DisplayStyles() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/project/api/tattoo-style/');
        const data = await response.json();
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
      <div className='custom-page styles'>
        {styles.map((style) => (
          <div key={style.id} >
            <Card className='custom-card display-styles' tabIndex={0}>
              <Card.Body>
                <Card.Title className='card-title display-styles'>
                  {style.style_name}
                </Card.Title>
                <div className='card-description display-styles'>
                  {style.description}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayStyles;
