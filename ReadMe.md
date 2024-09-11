# KudoSpot

This project can be cloned locally and run using a single command

    ```
    npm start
    ```

This will start the server and build the application available at `http://localhost:3000`

To run the development server locally, either run

    ```
    npm run dev
    ```
    or

> Run client (frontend) dev server using
    ```
    npm run dev:client
    ```
> Run server (backend) dev server using
    ```
    npm run dev:server
    ```

## Routes

- / -> if logged in, it will be landing page, else it will be login page
- /givekudo -> if logged in, it will be add kudo page
- /analytics -> if logged in, it will be analytics page

> The DB is pre-seeded, and the data can be found at [dump.json]("/server/dump.json")

- Following `username`s are pre-seeded

- `Kenna`
- `Margarete`
- `Felicia`
- `Diana`
- `Effie`
- `kaleigh`
- `Meghan`
- `Preston`
- `Kyler`
- `Clotilde`

- Following `badge`s are pre-seeded

- `Master Blastor`
- `Helping hand`
- `Heavy Driver`
- `Hacker`
- `Chigma Male`
- `Dhakad`
