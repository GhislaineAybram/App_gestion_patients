# Mes patients - application web de gestion de patients

Le projet consiste à développer une application web de gestion de patients. 
### Contraintes : 
- Front-end : Typescript / HTML / CSS
- Pas de framework de type Angular, React, ...
- Requête stockée soit en cache au niveau du front soit sur une base de données locale

## Aperçu du projet

*La page d'accueil du site*
![App Screenshot](/screen/app_gestion_accueil.png)

*Formulaire de création d'un nouveau patient*
![App Screenshot](/screen/app_gestion_patients_nouveau_patient.png)

*Formulaire d'édition d'un patient existant*
![App Screenshot](/screen/app_gestion_edition_patient.png)

## Tech Stack

- **Langages:** Typescript, Javascript , HTML, CSS, JSON
- **Database:** JSON (via JSON Server = serveur qui permet de créer une API REST fictive)

## Fonctionnalités

- [X] page d'accueil qui liste les patients et leurs informations (identifiant, nom, prénom, date de naissance),
- [X] possibilité de supprimer un patient (validation requise),
- [X] formulaire de création d'un nouveau patient (nom, prénom, date de naissance, lieu de naissance, photo),
- [X] fiche profil patient éditable avec informations utilisateur (identifiant, nom, prénom, date de naissance, lieu de naissance, photo),
**Toutes les informations sont éditables actuellement sauf la photo**
- [X] zoom de la photo du patient depuis la fiche profil patient,

## Reste à implémenter

- [ ] éditer la photo du patient,
      
## Lancement du projet

Installation et configuration :

```bash
npm install json-server
npx json-server db.json
```

Lancement serveur base de données :

```bash
json-server db.json --port=3000
```
