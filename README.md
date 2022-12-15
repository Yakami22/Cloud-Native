# Cloud Application

> Karmouni Yassine
> ENSTA Bretagne - CSN 2023

---

## Node.js application

### Environnement de travail

J'ai décidé de travailler sur Windows puisque j'avais déjà Node d'installer.
Pour installer toutes les dépendances il suffit de faire un npm install. Pour tester que le code marche, nous pouvons run la suite de test, et si tout se passe bien, cela devrait donner ceci :

![alttext](screens/Pasted%20image%2020221215142455.png)

### Package Files

Le fichier `package.json` existe à la racine d'un projet Javascript/Node. Il contient des métadonnées relatives au projet et est utilisé pour gérer les dépendances du projet, les scripts, etc. Dans notre cas par exemple, il contient les scripts pour lancer l'application, faire les tests, etc. Exemples :

```
npm run test
```

```
npm run build
```

```
npm run start
```

Le fichier `package-lock.json` contient quant à lui contient des informations sur tous les modules node installés. C'est grâce à ce module que l'om peut reproduire l'exacte arbre de dépendances si nous avions besoin de créer un nouveau projet similaire. Parmi les informations que l'on peut retrouver dans ce fichier nous avons :

- La version des modules
- L'URL de téléchargement
- Les dépendances du module d'autres modules

### Installation des dépendences

Nous installons le module systeminformation avec :

```
npm install systeminformation
```

Après installation, nous pouvons vérifier qu'il est bien présent en allant dans package.json.

```
"dependencies": {
    "systeminformation": "^5.12.13"
  }
```

La différence entre les **dependecies** et les **devdependecies** est que les premiers sont nécessaires pour lancer l'application, alors que les deuxièmes sont nécessaires uniquement lors du développement (par exemple pour faire nos tests unitaires etc.)

### Application

Le code de l'application se trouve principalement dans fichier **src**. Il contient :

- Un dossier `Interfaces` contenant l'interface pour les informations systèmes.
- Un dossier `routes` contenant un fichier `Get.ts` s'occupant de la création du server, et de la méthode **get** de notre serveur.
- Un fichier `SystemeInfo.ts` responsable de lire les informations du système sur lequel s'exécute le serveur.

### Test de notre API

J'ai décidé de tester mon API avec Postman. Cela donne :

![alttext](screens/Pasted%20image%2020221215163332.png)

Voici un petit extrait du résultat lorsque nous rentrons la bonne URL :

```json
"system": {
       "manufacturer": "HP",
       "model": "OMEN by HP Laptop 15-dc1xxx",
       "version": "",
       "serial": "5CD0142DKT",
       "uuid": "30444335-3431-4432-4b54-3822e228f1ef",
       "sku": "8FJ77EA#ABZ",
       "virtual": false
   },
   "mem": {
       "total": 17048154112,
       "free": 6724935680,
       "used": 10323218432,
       "active": 10323218432,
       "available": 6724935680,
       "buffers": 0,
       "cached": 0,
       "slab": 0,
       "buffcache": 0,
       "swaptotal": 13867417600,
       "swapused": 1456472064,
       "swapfree": 12410945536
   },
```

Et lorsque nous rentrons une URL inconnu, j'ai défini un message d'erreur pour remplacer la page d'erreur 404 :

![alttext](screens/Pasted%20image%2020221215164039.png)

Je pense que le formalisme que nous avons choisi ce formalisme d'URL pour permettre d'avoir plusieurs version (v1, v2, ...) ainsi que différentes routes pour chacun.

### Test Jest

Nos test sont écrit dans le fichier `index.sepc.ts`.  J'ai décidé de tester :

- Si le serveur fonctionne.
- Si nous somme dans la bonne URL, le serveur nous fournit les bonnes données.
- Si nous sommes dans une URL inconnue, le serveur retourne 404.
- Si notre fonction contient les informations voulues sur le CPU.

Pour lancer nos tests nous faisons :

```
npm run test:covreage
```

Et cela nous donne :

![alttext](screens/Pasted%20image%2020221215171046.png)

---

## Docker

### Installation de Docker

J'ai installé **Docker Desktop** sur Windows. Cela permet de l'utiliser dans **WSL** directement sans trop de réglages à faire.

### Docker Image

A l'aide de multi-stage builds, j'ai créé une première image Docker simples pour notre projet, puis a partir d'elle, j'ai créé une deuxième image Docker contenant uniquement les dépendances nécessaires. De plus cette dernière ne s'exécute pas en tant que root mais en tant qu'un autre utilisateur lambda.

L'intérêt de faire un projet multi-stage est de réduire la taille finale, qui est passé de 171MB a 56MB.

![alttext](screens/Pasted%20image%2020221215174404.png)
![alttext](screens/Pasted%20image%2020221215174303.png)

Nous pouvons maintenant publier notre image Docker.

Pour Tag notre Image :

```
docker tag sysinfo-api:0.0.x yakami22/sysinfo-api:0.0.x
```

Publier sur [Docker Hub](https://hub.docker.com/)

```
docker push yakami22/sysinfo-api:0.0.x
```

![alttext](screens/Pasted%20image%2020221215175238.png)

Pour déployer un nouveau conteneur a partir de notre image publiée :

```
docker pull yakami22/sysinfo-api:0.0.x
```

---

## CI/CD avec GitHub Actions

Pour l'intégration continue, les tests sont automatiquement effectués à chaque fois qu'un Push est fait vers la branche main.

Voici ce qui passe lorsque nous faisons un Push :

- Les dépendances sont installées avec `npm ci`
- L'application est build avec `npm run build`
- Les tests sont effectués avec `npm run test:coverage`

Voici un extrait de notre workflow :

```yml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16.3.0'
      - name: Install dependencies
        run: npm install
      # - run: npm run build --if-present
      - run: npm run test
```

Pour voir que notre worklfow fonctionne correctement :

![alttext](screens/Pasted%20image%2020221215180115.png)

## Deploiement

Pour déployer mon application, j'ai décidé d'utiliser Railway qui propose une offre gratuite a condition de lier son compte GitHub a l'application.

![alttext](screens/Pasted%20image%2020221215194951.png)

Il suffit après de choisir son projet GitHub pour le déployer.

![alttext](screens/Pasted%20image%2020221215195321.png)

![alttext](screens/Pasted%20image%2020221215195345.png)

Si tous les tests réussissent, l'application est déployée. Voici un extrait des logs pour les tests dans Railway :

```
#14 [builder 9/9] RUN npm run build
﻿#14 sha256:91b31c40a81eb6cdf574edd42cf553935b774ed942db6d40d37e2033c833b7be
﻿#14 0.900
﻿#14 0.900 > i-want-typescript@1.0.0 build
﻿#14 0.900 > tsc
﻿#14 0.900
﻿#14 DONE 10.0s
﻿#15 [runner 5/6] COPY --from=builder --chown=node:node /Cloud-Native/node_modules_production node_modules
﻿#15 sha256:bb026485e7ac8751848a13b3b03ae2fa1dba8768d5f6228d8a5d3a7569421398
﻿#15 DONE 0.2s
﻿#16 [runner 6/6] COPY --from=builder --chown=node:node /Cloud-Native/dist dist
﻿#16 sha256:a22fdc251342fb4641b51aad6ff275d257781f03169726b597b1f3d2850ac1cd
﻿#16 DONE 0.2s
﻿#17 exporting to image
﻿#17 sha256:e8c613e07b0b7ff33893b694f7759a10d42e180f2b4dc349fb57dc6b71dcab00
﻿#17 exporting layers
﻿#17 exporting layers 0.3s done
﻿#17 writing image sha256:b7c78eb452efa0f23c14737c860e4bf031d4dffbd31c44772068571b7eb5b003
﻿#17 writing image sha256:b7c78eb452efa0f23c14737c860e4bf031d4dffbd31c44772068571b7eb5b003 done
﻿#17 naming to us-west1-docker.pkg.dev/railway-infra/railway-docker-users/project/024c8ceb-1c8a-49a1-9ea5-132d36df2be5/service/9d455e82-cb6f-4a24-b3e4-575326a64b35:b2829e59-f62f-454b-bd68-bcd0256e342e 0.0s done
﻿#17 DONE 0.4s
﻿Build time: 31.93 seconds
```

Enfin, un extrait des caractéristiques systèmes du container qui fait tourner notre application.

```json
"cpu": {
	"manufacturer": "Intel",
	"brand": "XeonÂ®",
	"vendor": "",
	"family": "",
	"model": "",
	"stepping": "",
	"revision": "",
	"voltage": "",
	"speed": 2.2,
	"speedMin": null,
	"speedMax": null,
	"governor": "",
	"cores": 32,
	"physicalCores": 32,
	"performanceCores": 32,
	"efficiencyCores": 0,
	"processors": 1,
	"socket": "",
	"flags": "",
	"virtualization": false,
	"cache": {
		"l1d": "",
		"l1i": "",
		"l2": "",
		"l3": ""
	}
},
"system": {
	"manufacturer": "Google",
	"model": "Docker Container",
	"version": "",
	"serial": "-",
	"uuid": "",
	"sku": "-",
	"virtual": false
},
"mem": {
	"total": 126739296256,
	"free": 2035281920,
	"used": 124704014336,
	"active": 64181485568,
	"available": 62557810688,
	"buffers": 27617996800,
	"cached": 28991156224,
	"slab": 12276518912,
	"buffcache": 68885671936,
	"swaptotal": 0,
	"swapused": 0,
	"swapfree": 0
}
```
