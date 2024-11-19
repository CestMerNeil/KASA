[![English](https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png)](../README.md)
[![Français](https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-france2x.png)](/README/README_fr_FR.md)

> **Attention❗️ :** Ce projet utilise uniquement yarn, veuillez donc utiliser yarn pour installer les dépendances et exécuter le projet.
>> yarn install
>
>> yarn dev
>
>> yarn build

# Intégration de l'application
**Membres : Ao XIE, Reynalde SEGERIE, Antoine Viton**

# Contexte d'utilisation
Nous sommes l'équipe de développement d'une jeune entreprise de multimédia nommée KASA qui souhaite automatiser la gestion de son catalogue de produits. L'entreprise KASA a besoin d'une application web pour afficher les produits, les trier par catégorie et permettre aux utilisateurs de rechercher des produits.
De plus, l'entreprise souhaite se démarquer de ses concurrents en offrant une expérience utilisateur de qualité.

Afin de fidéliser sa clientèle, l'entreprise souhaite également mettre en place un système d'espace personnel (authentification, compte utilisateur, etc.) permettant aux utilisateurs de sauvegarder leurs produits favoris et de retrouver leurs recherches précédentes.

# Flux de présentation des produits
<font color='red'>**TODO :** Le code de la section "Récupération des données depuis l'API" a été refactorisé et doit être réécrit à l'exception du diagramme de flux.</font>

## Vue d'ensemble
Le composant `ListCard` récupère les données des produits depuis l'API `/data` et les affiche en fonction de la catégorie sélectionnée (`type`). Ce document décrit la structure des données et la manière dont le frontend gère la catégorisation et la présentation des produits.

## Format des données
Chaque produit de l'API contient les champs suivants :

- **serialNumber** : Un identifiant unique pour le produit.
- **productName** : Le nom du produit, y compris les détails spécifiques du modèle.
- **brand** : La marque du produit.
- **model** : L'identifiant spécifique du modèle.
- **description** : Une brève description des caractéristiques et spécifications principales du produit.
- **price** : Le prix en USD.
- **image** : URL de l'image du produit.
- **clicks** : Le nombre de clics ou de vues, indiquant la popularité.
- **type** : <font color='red'>**_TODO : À corriger_**</font> La catégorie du produit, comme "téléphone" ou "PC".

## Vue d'ensemble du flux

1. **Récupération des données** :
   Le composant `ListCard` effectue une requête vers `/data` pour récupérer toutes les données des produits.

2. **Filtrage par catégorie** :
   En fonction de la page sélectionnée par l'utilisateur, le champ `type` est utilisé pour filtrer les produits à afficher. Par exemple :
   - Si l'utilisateur sélectionne la catégorie "smartphone", seuls les produits avec `type: phone` sont affichés.

3. **Rendu** :
   Les produits correspondant au `type` sélectionné sont affichés sous forme de cartes, contenant les informations suivantes : nom, marque, modèle, description, prix, clics, et image.

### Diagramme pour les pages d'affichage

```mermaid
flowchart TD
    A(Page d'accueil) --> B[Récupérer les informations de base sur les produits depuis l'API]
    C -->|Utilisation de la fonction de recherche| G[Afficher la page de recherche]
    G --> H[Filtrer les produits par mot-clé]
    H --> I[Afficher les produits correspondant au mot-clé]
    I -->|L'utilisateur ajoute un produit au panier| D
    B --> C[Afficher tous les produits]
    C -->|L'utilisateur ajoute un produit au panier| D
    C -->|L'utilisateur sélectionne des sous-pages| E[Filtrer les produits par sous-page]
    E --> K[Afficher les produits par sous-page]
    K -->|L'utilisateur ajoute un produit au panier| D(Produit ajouté au panier)
```

# Flux de travail du chatbot

## Vue d'ensemble
Le chatbot est une interface conversationnelle qui aide les utilisateurs à trouver des produits en fonction de leurs préférences. Ce document décrit la structure du chatbot et son interaction avec les données des produits.

## API ChatGPT
Le composant du __ChatBot__ a été implémenté en utilisant l'API OpenAI ChatGPT. <font color='red'>**_Cette API nécessite une clé stockée dans le fichier `.env.local`._**</font> Ce fichier n'est pas inclus dans le dépôt. Utilisez le format suivant pour créer le fichier :
```json
OPENAI_API_KEY=votre_clé_ici
```

## Vue d'ensemble du flux
```mermaid
graph TD;
    A[L'utilisateur ouvre le chatbot] --> B[Initialisation du chatbot avec useState et useEffect];
    
    B --> C1[Récupérer les données des produits depuis /api/backend];
    C1 --> D1[Le backend répond avec les données des produits];
    D1 --> E1[Les données des produits sont traitées et affichées dans le chat];

    E[L'utilisateur envoie un message] --> F1[Envoyer le message à handleResponse];
    F1 --> G1[Appel à l'API OpenAI /api/openai];
    G1 --> H1[L'API OpenAI traite la demande et retourne une réponse];
    H1 --> I1[Réponse ajoutée au chat];

    C1 --> J[Gestion des erreurs pour l'API backend];
    G1 --> K[Gestion des erreurs pour l'API OpenAI];
```

# Fonction de recherche

## Vue d'ensemble
En utilisant Fuse.js, la fonction de recherche permet aux utilisateurs de rechercher des produits par mots-clés. Ce document décrit la fonctionnalité de recherche et son interaction avec les données des produits.

# Intégration OAuth2 de Google
```mermaid
sequenceDiagram
    participant Utilisateur
    participant Application
    participant ServeurAutorisation as Serveur d'autorisation Google
    participant ServeurRessources as API Google (Serveur de ressources)

    Utilisateur->>Application: Demande de connexion
    Application->>ServeurAutorisation: Redirection de l'utilisateur pour l'autorisation
    ServeurAutorisation->>Utilisateur: Demande de permission
    Utilisateur->>ServeurAutorisation: Permission accordée
    ServeurAutorisation->>Application: Retour du code d'autorisation
    Application->>ServeurAutorisation: Échange du code contre un jeton d'accès
    ServeurAutorisation->>Application: Retour des jetons d'accès et de rafraîchissement
    Application->>ServeurRessources: Utilisation du jeton d'accès pour accéder aux ressources
    ServeurRessources->>Application: Retour des données utilisateur
    Application->>ServeurAutorisation: Rafraîchir le jeton d'accès expiré
    ServeurAutorisation->>Application: Retour du nouveau jeton d'accès
```

# Flux de connexion utilisateur
```mermaid
sequenceDiagram
    participant Utilisateur
    participant Frontend
    participant Backend
    participant BaseDeDonnées

    Utilisateur ->> Frontend: Soumettre les identifiants
    Frontend ->> Backend: Envoyer les identifiants
    Backend ->> BaseDeDonnées: Vérifier les identifiants
    BaseDeDonnées ->> Backend: Résultat de la vérification
    alt Identifiants valides
        Backend ->> Frontend: Retourner le jeton d'accès (JWT)
        Frontend ->> Utilisateur: Authentification réussie
    else Identifiants invalides
        Backend ->> Frontend: Erreur d'authentification
        Frontend ->> Utilisateur: Message d'erreur
    end

    Utilisateur ->> Frontend: Demander une ressource protégée
    Frontend ->> Backend: Envoyer la demande avec le jeton
    Backend ->> Backend: Vérifier le jeton (JWT)
    alt Jeton valide
        Backend ->> Frontend: Retourner la ressource
        Frontend ->> Utilisateur: Afficher la ressource
    else Jeton invalide ou expiré
        Backend ->> Frontend: Erreur d'authentification
        Frontend ->> Utilisateur: Demande de reconnexion
    end
```
