export const isLoggedIn = (status?: number | boolean) => {
  return status ? "!ring-green-500 !border-green-500" : "!ring-gray-500 !border-gray-500";
}
