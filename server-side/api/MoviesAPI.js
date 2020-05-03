const axios = require("axios");

const URL = "https://api.thetvdb.com";

const instance = axios.create({
  baseURL: URL,
});
const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkwMzk1MzksImlkIjoibW92aWUgcmVjb21tZW5kYXRpb24iLCJvcmlnX2lhdCI6MTU4ODQzNDczOSwidXNlcmlkIjoyMjgwNTIyLCJ1c2VybmFtZSI6Ik1vaGFtbWVkIEdlaGFkIn0.eCDdVWw_7GPq65Kjs2jAK2VmQGGHeVXbqZVCGZl-q1ucelU_jSjK9QmLAJgvcJVGaaZX3HMV-yFdbjKK6NWGdpThtYrc0qIjDF5MYgUCvliH-etrHoErvqQb1wUlzsyEOQlPCAsW31M0jBFeeMiwfh4rj21JXxut4fbdSNOKdPiI_TstZr7zSxPcAffuY_8u4g0pK7x0PGfIiLoW_RXIaHNQcohWE0M8rgg3Vpb_Sx3el_4f82gfgeyP1bzo29rCfJgoHJwZ9kePjRsGbFfEeUJFf-iasLMf3dt3v_wYUTO7BDY7VnGi81oe7OKEXrlXfhXfnF43ASQctG_vxZNPpQ";
const Authorization = `Bearer ${TOKEN}`;

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const authorization = Authorization;
    if (authorization) config.headers.Authorization = authorization;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

module.exports = instance;
