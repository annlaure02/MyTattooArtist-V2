import React, { createContext, useState } from 'react';
// Initiate Context which allows to share the state between components
const ArtistContext = createContext();

const ArtistProvider = ({ children }) => {
  const [artistId, setArtistId] = useState(null);

  const login = (id) => {
    setArtistId(id);
  };

  const logout = () => {
    setArtistId(null);
  };

  return (
    <ArtistContext.Provider value={{ artistId, login, logout }}>
      {children}
    </ArtistContext.Provider>
  );
};

export { ArtistContext, ArtistProvider }
