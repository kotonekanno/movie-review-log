import { apiClient } from "./client";
import { ApiError } from "@/errors/ApiError";

export async function getStatisticsOverview() {
  const res = await apiClient(`/statistics/overview`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("GET /statistics/overview failed", res.status);
}

export async function getStatisticsMonthly() {
  const res = await apiClient(`/statistics/monthly`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("GET /statistics/monthly failed", res.status);
}