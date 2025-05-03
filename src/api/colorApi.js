const BASE_URL =
  "https://script.google.com/macros/s/AKfycbxzfH1-z7yyRFjYp1Id13i8eaDwdZ6HEV_8DKf6BscI1Fgr-ztYA2HMK2Hit4-vpswJ2Q/exec";

export const getAvailableColors = async () => {
  const res = await fetch(`${BASE_URL}?mode=availableColors`);
  return await res.json();
};

export const getAssignedColor = async (name) => {
  const res = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`);
  return await res.json();
};
