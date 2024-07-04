import { UpdateAPIUsage } from "../../UpdateAPIUsage/UpdateAPIUsage.js";
import { DoTheAPIQuickWork } from "../DoTheAPIQuickWork.js";

export async function get_gpt_funcQuickWork(req, res) {
  // the main work goes down here
  const outputData = await DoTheAPIQuickWork(req);

  // Incrémente/Modifie les données d'utilsaton d'API
  // sur stripe/firebase/etc..., selon besoins.
  // implémente ta logique custom.
  // puis fournit un objet record
  // qui contient des données d'usage d'API,
  // que tu souhaites fournir au client
  const record = await UpdateAPIUsage();

  // retourne les données, le graal,
  // le caviar kush, ze précieux,
  // pour le client.
  // accompagnées des données d'utilisation d'API
  res
    .status(outputData.status)
    .send({ answer: outputData.data, usage: record });

  return;
}
