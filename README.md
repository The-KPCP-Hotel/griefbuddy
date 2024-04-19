# griefbuddy

Welcome to GriefBuddy! Here you can make friends with people going through similar situations. Find events to get your mind off things and have access to resources to help you get through these rough times.

# Developers

**DOT ENV FILE**
Create a dot env file and with the following variables:
```
GOOGLE_CLIENT_ID=(your google client id)
GOOGLE_CLIENT_SECRET=(your google secret)
DATABASE_URL="postgresql://<your computer username>:<your computer password>@localhost:<your psql port, likely 5432>/griefbuddy?schema=public"
NINJA_API_KEY=(your ninja api key from https://api-ninjas.com/)
MODE=development
OPENAI_API_KEY='(your openai key)'
TEXTBELT_API_KEY=(your textbelt api key)
```

**STARTUP**
* Previously used with node versions 20-21
* Create the dot env file
* Install dependencies: ```npm install```
* Install PostgreSQL: ```brew install postgresql@16``` **SAVE THE PATH OUTPUTTED AFTER INSTALL**
* Start a PostgreSQL server: ```postgres -D <your path to postgres>```
* Connect to PostgreSQL shell: ```createdb griefbuddy``` ```psql griefbuddy```
* Migrate prisma schema to PostgreSQL database and anytime making changes to schema.prisma file: ```npx prisma migrate dev --name init```
* Build the webpack: ```npm run build```
* Start the server: ```npm start```


# Contributors
Thanks to all the following people for contributing to this project:
[@PeytonOwen](https://github.com/peytono)
[@CamronCaldwell](https://github.com/ccaldwell11)
[@KylanPatton](https://github.com/kycodee)