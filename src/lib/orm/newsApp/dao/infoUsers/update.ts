import model from "../../model";

export async function updateInfoWorker({
  wk_phone,
  fcm_token,
  phone_os,
}: // phone_os
{
  wk_phone: string;
  fcm_token: string;
  phone_os: number;
}) {
  try {
    await model.infoWorker.update(
      { fcm_token, phone_os },
      { where: { wk_phone } }
    );
  } catch (error) {
    console.log({ error });
  }
}
