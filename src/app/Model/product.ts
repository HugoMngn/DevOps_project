// src/app/models/product.ts

export class Product {
    id: number;  // Identifiant unique pour le produit
    nom: string; // Nom du produit
    texture: string; // Texture du produit
    grammage: string; // Grammage du produit
    couleur: string; // Couleur du produit
  
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
  