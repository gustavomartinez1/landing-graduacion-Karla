"use client";
import useSWR from "swr";
import { Graduate } from "../types";
const fetcher = (url: string) => fetch(url).then((r) => r.json());
export function useGraduates() {
  const { data, error, isLoading, mutate } = useSWR<Graduate[]>("/api/graduates", fetcher, { refreshInterval: 30000, revalidateOnFocus: true });
  return { graduates: data || [], isLoading, isError: !!error, mutate };
}
