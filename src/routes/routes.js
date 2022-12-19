import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import {
    ActiveUsers,
    Archive,
    CanceledRequests,
    Contact,
    News,
    NonActiveUsers,
    DisBasleshik,
    Basleshik,
    NotFound,
    Login,
    DisActiveNews,
    ContactResponse,
} from "../pages/index";
import history from "./history";
import ScrollIntoView from "./ScrollIntoView";
import Loading from "../components/loading";

const PrivateRoute = lazy(() => import("./PrivateRoute"));

const App = () => {
    return (
        <BrowserRouter history={history}>
            <ScrollIntoView>
                <Suspense fallback={Loading}>
                    <Switch>
                        <PrivateRoute
                            restricted={false}
                            component={ActiveUsers}
                            path="/ActiveUsers"
                            exact
                        />
                        <PrivateRoute
                            restricted={false}
                            component={NonActiveUsers}
                            path="/DisActiveUsers"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={Archive}
                            path="/archive"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={CanceledRequests}
                            path="/canceledRequests"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={Contact}
                            path="/posts"
                            exact
                        />
                        <PrivateRoute
                            restricted={false}
                            component={ContactResponse}
                            path="/sendPost"
                            exact
                        />
                        <PrivateRoute
                            restricted={false}
                            component={Contact}
                            path="/notifications"
                            exact
                        />
                        <PrivateRoute
                            restricted={false}
                            component={News}
                            path="/ActiveNews"
                            exact
                        />
                        <PrivateRoute
                            restricted={false}
                            component={DisActiveNews}
                            path="/DisActiveNews"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={NonActiveUsers}
                            path="/nonActiveUsers"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={DisBasleshik}
                            path="/DisBasleshik"
                            exact
                        />

                        <PrivateRoute
                            restricted={false}
                            component={Basleshik}
                            path="/basleshik"
                            exact
                        />

                        <Route path="/" component={Login} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </ScrollIntoView>
        </BrowserRouter>
    );
};

export default App;
