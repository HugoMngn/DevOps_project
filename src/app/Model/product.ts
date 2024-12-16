export class Product {
    id: number;  
    nom: string; 
    texture: string; 
    grammage: string; 
    couleur: string;
  
    constructor(
      id: number = 0,
      nom: string = '',
      texture: string = '',
      grammage: string = '',
      couleur: string = ''
    ) {
      this.id = id;
      this.nom = nom;
      this.texture = texture;
      this.grammage = grammage;
      this.couleur = couleur;
    }
  }
  