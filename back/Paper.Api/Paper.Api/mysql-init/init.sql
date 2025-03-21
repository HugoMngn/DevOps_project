CREATE TABLE IF NOT EXISTS Products (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Nom VARCHAR(25) NOT NULL,
  Texture VARCHAR(30) NOT NULL,
  Grammage VARCHAR(7) NOT NULL,
  Couleur VARCHAR(25) NOT NULL
);

INSERT INTO Products (Id, Nom, Texture, Grammage, Couleur) VALUES
('1', 'Papier 1', 'Doux', '9 gr', 'Bleu turquoise'),
('2', 'Papier 2', 'Rugueux', ' 23 gr', 'Gris cassiope'),
('3', 'Papier 3', 'Plastifie', ' 1 gr', 'Vert emeraude');