import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { getUserAdapter } from "../infrastructure/driving/api-gateway/getUserAdapter";
import { importDependencies } from "../utils/importDependencies";

export const handler = middy()
.use(httpJsonBodyParser())
.use(importDependencies({
    depen: "Esta es una dependencia de ejemplo s",
})())
.handler(getUserAdapter);