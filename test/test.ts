import { OpenDppApiClient } from "../dist";

const client = new OpenDppApiClient({
    baseURL: 'https://api.cloud.open-dpp.de'
});

async function main() {
    const response = await client.getOrganizations();
    console.log(response);
}

main();