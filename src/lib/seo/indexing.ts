export function isSearchIndexableDeployment(
  vercelEnv: string | undefined,
): boolean {
  return !vercelEnv || vercelEnv === "production";
}
