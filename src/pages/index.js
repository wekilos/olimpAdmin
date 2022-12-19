import { lazy } from "react";

export const ActiveUsers = lazy(() => import("./activeUsers/activeUsers"));
export const Archive = lazy(() => import("./archive/archive"));
export const CanceledRequests = lazy(() =>
    import("./canceledRequests/canceledRequests")
);
export const Contact = lazy(() => import("./contact/contact"));
export const ContactResponse = lazy(() => import("./contact/contactResponse"));
export const News = lazy(() => import("./news/news"));
export const DisActiveNews = lazy(() => import("./news/DisActiveNews"));
export const NonActiveUsers = lazy(() =>
    import("./nonActiveUsers/nonActiveUsers")
);
export const DisBasleshik = lazy(() => import("./DisBasleshik/disBasleshik"));
export const Basleshik = lazy(() => import("./Basleshik/basleshik"));
export const NotFound = lazy(() => import("./404/404"));
export const Login = lazy(() => import("./login/login"));
