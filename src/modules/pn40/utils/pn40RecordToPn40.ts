export const pn40RecordToPn40: (pn40record: pn40record) => req40 = (
  pn40record: pn40record
) => {
  const { iw_idx, x, y, site_idx } = pn40record;
  return {
    iw_idx,
    lat: `${y}`,
    lng: `${x}`,
    site_idx,
    key: "amons_tm",
    pn: 40,
  };
};
