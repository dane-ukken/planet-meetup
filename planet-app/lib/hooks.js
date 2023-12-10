import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    // If redirectTo is not set or data is not yet loaded, do nothing
    if (!redirectTo || !finished) return;

    // Determine if a redirect is needed based on the presence of a user and the redirect conditions
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      // Special handling for root redirect
      if (redirectTo === "/" && hasUser) {
        Router.push(user.role === "admin" ? "/admin-dashboard" : "/events");
      }
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
