import { DECISIONS_ROOT } from "./ApiConfig";
import { AuthApi } from "./AuthApi";

export function getReportUrl(reportId: string) {
  return getUrlWithSessionId("ReportId", reportId);
}

export function getFlowIdUrl(flowId: string) {
  return getUrlWithSessionId("FlowId", flowId);
}

/**
 * Creates Flow url for a flow reference by "Alias". Assumes this was done to create
 * "pretty" paths and that the provided url is not
 * @param flowAlias create a flow URL based on alias
 */
export function getFlowAliasUrl(flowAlias: string) {
  // do not presume alias (from our JS point of view) is URL encoded
  return getUrlWithSessionId("FlowAlias", encodeURIComponent(flowAlias));
}

/**
 * @param type "ReportId" | "FlowId" | "FlowAlias" depending on what's being fetched
 * @param id id, path, or alias, depending on the integration type.
 * @return url with sessionId query parameter appended.
 */
export function getUrlWithSessionId(
  type: "ReportId" | "FlowId" | "FlowAlias",
  id: string
) {
  const sessionId = AuthApi.getSessionId(); // TODO escape?
  return `${DECISIONS_ROOT}?${type}=${id}&Action=api&outputtype=JSON&sessionId=${sessionId}`;
}
