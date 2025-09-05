import model from "../../model";

export async function createAll(datas: any[]) {
  const timestamp = new Date().getTime();
  datas.forEach(async (d) => {
    await model.logPush.create({ ...d, timestamp });
  });
}
