const statusChecker = (status: string) => {
  return status?.toLowerCase().replace(/ /g, "-") || "archive";
}

export default statusChecker;
