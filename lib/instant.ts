import { init, id } from '@instantdb/react';

// ID for app: personalsite
const APP_ID = 'b8e2308a-e3b8-4c9b-8ab7-282d23bba847';

const db = init({ appId: APP_ID });

export { db, id }