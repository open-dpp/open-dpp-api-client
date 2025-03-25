import { http, HttpResponse } from "msw";
import { randomUUID } from "node:crypto";
import { baseURL } from "./index";

export const uniqueProductIdentifierId = randomUUID();
export const responseView = {
  name: "Standard",
  sections: [
    {
      name: "Technische Spezifikation",
      rows: [
        {
          fields: [
            {
              type: "TextField",
              name: "Prozessor",
              value: "fdasrew",
            },
          ],
        },
      ],
    },
  ],
};
export const uniqueProductIdentifierHandlers = [
  http.get(
    `${baseURL}/unique-product-identifiers/${uniqueProductIdentifierId}/view`,
    () => {
      return HttpResponse.json({ ...responseView });
    },
  ),
];
