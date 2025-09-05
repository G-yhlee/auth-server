import model from "../../model";

export async function destroy() {
  return await model.logPush.truncate();
}
