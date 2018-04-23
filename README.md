#run

use configured private repository

install deps
`yarn`

compile code
`npm run compile`

restore inital data
`npm run restoreData`

run api
`npm start`

run graphiql the folder above

use  `DEBUG=express:server npm start` to run with extended debug log
use `src/register.ts` to configure logger
check `src/schema/packages` to generate diagrams
