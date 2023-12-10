import { useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/features/user/userSlice';

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!redirectTo || loading || error) return;

    const hasUser = Boolean(user);
    
    if (hasUser && redirectTo === "/") {
      Router.push(user.role === "admin" ? "/admin-dashboard" : "/events");
    } else if ((redirectIfFound && hasUser) || (!redirectIfFound && !hasUser)) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, user, loading, error]);

  return user;
}
