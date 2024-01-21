import middy from '@middy/core'
import { getUserAdapter } from "../infrastructure/driving/api-gateway/getUserAdapter";
import { getUserSchema } from './schema/getUserSchema';
import { UserLocal } from '../infrastructure/driven/user/UserLocal';
import { validator } from '../utils/validator';

const dependencies = {
    userRepository: new UserLocal(`./database/user.json`)
}


export const handler = middy()
.use(
    validator(getUserSchema)
)
.handler(getUserAdapter(dependencies));
