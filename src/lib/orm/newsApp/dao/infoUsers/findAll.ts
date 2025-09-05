import model from "../../model";

export async function findAll() {
  return await model.infoWorker.findAll();
}
