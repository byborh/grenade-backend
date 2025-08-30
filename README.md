---

# ��� Grenade – Le vote express - Backend

**Grenade** est une application collaborative simple permettant aux membres d’une équipe de proposer des idées et de voter pour leurs préférées.
Le backend est construit en **Node.js/TypeScript** avec une architecture **serverless** (AWS Lambda, DynamoDB, API Gateway) et expose une API **GraphQL**.

---

## ��� Fonctionnalités

* **Proposer une idée** : créer une idée avec un texte, votes = 0 par défaut.
* **Lister toutes les idées** : récupérer les idées existantes.
* **Voter pour une idée** : incrémenter le nombre de votes d’une idée.

---

## ���️ Stack technique

* **Backend** : Node.js, TypeScript
* **API** : GraphQL (Apollo Server / GraphQL Yoga)
* **BDD** : DynamoDB (AWS)
* **Déploiement** : AWS Lambda + API Gateway
* **CI/CD** : GitHub Actions
* **Tests unitaires (TDD)** : Vitest

---

## ��� Structure du projet

```
backend/
 ├─ src/
 │   ├─ models/Idea.ts          # Modèle Idea
 │   ├─ resolvers/ideaResolver.ts # Logique métier (CRUD idées)
 │   └─ index.ts                # Entrée principale (GraphQL server)
 ├─ tests/
 │   └─ idea.test.ts            # Tests unitaires
 ├─ .github/workflows/ci.yml    # CI GitHub Actions
 ├─ package.json
 └─ tsconfig.json
```

---

## ��� Tests (TDD)

Les tests sont écrits en **Vitest** et exécutés automatiquement via **GitHub Actions**.

Lancer les tests en local :

```bash
npm install
npm test
```

Exemples de tests :

* `createIdea()` → l’idée a bien un `id`, `text`, `votes=0`.
* `getIdeas()` → retourne une liste d’idées avec typage correct.
* `voteIdea()` → incrémente le compteur de votes.

---

## ⚡ CI/CD

Chaque **push sur `main`** déclenche une pipeline GitHub Actions :

1. Installation des dépendances
2. Lancement des tests unitaires
3. Déploiement automatique sur AWS Lambda

---

## ��� Roadmap

* [ ] TDD avec Vitest
* [ ] CI GitHub Actions (tests)
* [ ] Connexion réelle à DynamoDB
* [ ] Déploiement sur AWS Lambda + API Gateway
* [ ] Monitoring avec CloudWatch

---

## ��� Licence

Projet réalisé dans le cadre d’un apprentissage fullstack et cloud.
Libre d’utilisation et d’adaptation.
