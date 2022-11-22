#Image pour la compilation

# image de départ
FROM alpine:3.15 as builder

# chemin de travail
WORKDIR /Cloud-Native

# installation des paquets système
RUN apk add --update nodejs
RUN apk add --update npm

# copie des fichiers du dépôt
COPY . ./

# installation des dépendances avec npm
RUN npm ci --only=production
RUN cp -R node_modules node_modules_production
RUN npm ci

# build avec npm
RUN npm run build



#Image pour l'execution

# stage exécution
FROM alpine:3.15 as runner

# chemin de travail
WORKDIR /Cloud-Native

# installation des paquets système
RUN apk add --update nodejs

# creer utilisateur et groupe node / node
RUN addgroup -S node && adduser -S node -G node


# copie des fichiers du dépôt a partir de l'ancien build

COPY --from=builder --chown=node:node /Cloud-Native/node_modules_production node_modules
COPY --from=builder --chown=node:node /Cloud-Native/dist dist


USER node

# exécution
CMD ["node","./dist/index.js"]

