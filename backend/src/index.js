import dotenv from "dotenv"
import {app} from "./app.js";

import { Connectdb } from "./db/connection.js";

dotenv.config()
const PORT=process.env.PORT
Connectdb().then(()=>{app.listen(PORT, () => {
  console.log(`🚀 SkillMitra backend running on port ${PORT}`);
});
}).catch((err)=>{
  console.log("MONGO DB connection failed",err);
})




