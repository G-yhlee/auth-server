import model from "../../model";

export async function create(data: any) {
  console.log({ data });

  try {
    delete data.target_id;
    await model.infoWorker.create(data);
  } catch (error) {
    console.log({ error });
  }
}
